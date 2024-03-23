function FormInput({ label, name, type, placeholder, value, error, onChange }) {
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
            {error && <span>{error.msg}</span>}
        </div>
    );
}

export default FormInput;
