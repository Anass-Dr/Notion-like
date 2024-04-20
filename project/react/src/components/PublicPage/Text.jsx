function Text({ type, children }) {
    return <div className={`_${type} block`}>{children}</div>;
}

export default Text;
