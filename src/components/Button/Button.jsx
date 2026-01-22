import './button.css'

export const Button = ({
    children,
    type = 'button',
    className = '',
    disabled = false,
    ...props
}) => {
    return (
            <button
                className={className}
                type={type}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
    )
}