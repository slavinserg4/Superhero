import { Link } from "react-router-dom";
import "./styleForMenu.css"
const Menu = () => {
    return (
        <nav className="Menu">
            <div className="MenuContainer">
                <div className="MenuTitle">
                    <h2>Superheroes</h2>
                </div>
                <div className="MenuLinks">
                    <Link className="MenuLink" to="/create">Create Superhero</Link>
                    <Link className="MenuLink" to="/">Superheroes</Link>
                </div>
            </div>
        </nav>

    );
};

export default Menu;