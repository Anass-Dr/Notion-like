function FormInput({ label, name, type, placeholder, value, onChange }) {
    return (
        <>
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
        </>
    );
}

export default FormInput;
