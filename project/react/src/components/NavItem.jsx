import "./nav-item.css";

function NavItem({ title, action, children }) {
    return (
        <li onClick={action} className="nav-item">
            {children}
            <span>{title}</span>
        </li>
    );
}

export default NavItem;
