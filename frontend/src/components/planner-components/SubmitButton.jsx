

function SubmitButton({ onClick, label, className }) { //props
    return (
        <button type="button" onClick={onClick} className={className}>
            {label}
        </button>
    );
}

export default SubmitButton;