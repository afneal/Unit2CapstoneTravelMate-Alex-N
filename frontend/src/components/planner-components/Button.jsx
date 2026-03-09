

function Button({onClick, label, className}) {
    return (
        <button type="button" onClick={onClick} className={className}>
            {label}
        </button>
    )
}
export default Button;