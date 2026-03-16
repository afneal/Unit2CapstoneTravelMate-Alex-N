

function Button({onClick, label, className, disabled}) { //can style Buttons similarly easily
    return ( //pass in props (onClick, disabled, className)
        <button type="button" onClick={onClick} disabled={disabled} className={className}> 
            {label}
        </button>
    )
}
export default Button;