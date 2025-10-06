import "../styles/navbar.css"

export default function NavBar({active, setActive, items, quickAccessItems}) {


    console.log(items)

    return(
        <nav className="navbar">
            <div className="navbar-menu">
                <h3 className="navbar-section">Menu</h3>
                {items.map((item) => (
                    <p
                        key={item}
                        className={`navbar-item ${active === item ? "active" : ""}`}
                        onClick={() => setActive(item)}
                    >
                        {item}
                    </p>
                ))}
            </div>

            <div className="navbar-quick-access">
                <h3 className="navbar-section">Quick Access</h3>
                {quickAccessItems.map((item) => (
                    <p
                        key={item}
                        className={`navbar-item ${active === item ? "active" : ""}`}
                        onClick={() => setActive(item)}
                    >
                        {item}
                    </p>
                ))}
            </div>

        </nav>
    )
}