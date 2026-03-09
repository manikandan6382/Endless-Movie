import { useState , useRef , useEffect } from "react";
import { Check , ChevronDown } from "lucide-react";
interface DropdownProps {
    value: string,
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    label?: string;
}

const Dropdown = ({ value, options, onChange, label }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutSide = (event: Event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    }, [])
    const selectedOptions = options.find(o => o.value === value);
    return (
        <div className="relative min-w-35" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-5 py-2 backdrop-blur-sm bg-black/70 text-white rounded-full flex items-center justify-between gap-2 cursor-pointer transition-all duration-200 hover:shadow-lg`}
            >
                <span>{selectedOptions?.label || label}</span>
                <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-full backdrop-blur-sm bg-black/60 rounded-lg shadow-2xl z-20 overflow-hidden animate-slideDown pt-2">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar overflow-x-clip">
                        {options.map(option => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                    setIsOpen(!isOpen)
                                }}
                                className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-black/70 transition-all duration-300 cursor-pointer relative overflow-hidden group ${value === option.value ? 'font-semibold' : ''}`}
                            >
                                <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-300"></span>

                                <span className="text-white relative z-10">{option.label}</span>
                                {value === option.value && (
                                    <Check className="size-4 text-white relative z-10 animate-scaleIn" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown