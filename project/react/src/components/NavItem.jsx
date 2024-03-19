import "./nav-item.css";

function NavItem({ title, children }) {
    return (
        <li className="nav-item">
            {children}
            <span>{title}</span>
        </li>
    );
}

export default NavItem;
