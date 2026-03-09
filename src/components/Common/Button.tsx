import { type MouseEvent, type ReactNode } from 'react'
interface ButtonProps {
    children: ReactNode;
    className: string;
    onClick: () => void;
    icon?: ReactNode;
}
const Button = ({ onClick, children, className = '', icon }: ButtonProps) => {
    const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600)
    }
    return (
        <button
            onClick={(e) => {
                handleRipple(e);
                onClick()
            }
            }
            className={`relative overflow-hidden text-sm px-4 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer ${className}`}
        >
            {icon && icon}
            {children}
        </button >
    )
}

export default Button