

function Button({onClick, label, className, disabled}) {
    return (
        <button type="button" onClick={onClick} disabled={disabled} className={className}>
            {label}
        </button>
    )
}
export default Button;