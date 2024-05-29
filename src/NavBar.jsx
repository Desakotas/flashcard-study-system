import './NavBar.css';
import Button from './Button';
import { useState } from 'react';

function NavBar({ setPage, onShowScore}) {

    const [isopened,setIsOpened] = useState(false);
    const openState = isopened ? "open" : "";

    function go(event, page) {
        event.preventDefault();
        setPage(page);
        setIsOpened(false);
        if (page === "Scores") {
            onShowScore(); 
        }
    }

    return (
        <nav className="navbar">
            <ul className={`menu ${openState}`}>
                    <li className="menu__item">
                        <Button className="menu__button" type="button" onClick={(e) => go(e, "Questions")}>Questions</Button>
                    </li>
                    <li className="menu__item">
                        <Button className="menu__button" type="button" onClick={(e) => go(e, "Scores")}>Scores</Button>
                    </li>
            </ul>
        </nav>
    );
}

export default NavBar;