import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

interface DropdownProps {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    label?: string;
}

const Dropdown = ({ value, options, onChange, label }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [popupStyle, setPopupStyle] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const popupWidth = Math.max(rect.width, 160);
            // clamp left so popup doesn't go off screen right edge
            const left = Math.min(rect.left + window.scrollX, window.innerWidth - popupWidth - 8);
            setPopupStyle({ top: rect.bottom + window.scrollY + 8, left, width: popupWidth });
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        // close on any scroll or resize anywhere
        const close = () => setIsOpen(false);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => {
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                buttonRef.current && !buttonRef.current.contains(e.target as Node) &&
                popupRef.current && !popupRef.current.contains(e.target as Node)
            ) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOpen = () => {
        updatePosition();
        setIsOpen(o => !o);
    };

    const selectedOption = options.find(o => o.value === value);

    return (
        <div className="relative min-w-35">
            <button
                ref={buttonRef}
                onClick={handleOpen}
                className="w-full px-5 py-2 backdrop-blur-sm bg-black/70 text-white rounded-full flex items-center justify-between gap-2 cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
                <span>{selectedOption?.label || label}</span>
                <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && createPortal(
                <div
                    ref={popupRef}
                    style={{ top: popupStyle.top, left: popupStyle.left, width: popupStyle.width }}
                    className="absolute backdrop-blur-sm bg-black/90 rounded-lg shadow-2xl z-[9999] overflow-hidden animate-slideDown pt-2"
                >
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map(option => (
                            <button
                                key={option.value}
                                onClick={() => { onChange(option.value); setIsOpen(false); }}
                                className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-black/70 transition-all duration-300 cursor-pointer relative overflow-hidden group ${value === option.value ? 'font-semibold' : ''}`}
                            >
                                <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-300"></span>
                                <span className="text-white relative z-10">{option.label}</span>
                                {value === option.value && <Check className="size-4 text-white relative z-10 animate-scaleIn" />}
                            </button>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Dropdown;