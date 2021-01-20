import React from 'react';
import './Nav.css';

function Nav() {
    return (
        <nav className={"navbar bg-primary"}>
            <a className={"navbar-brand text-light"} href="/" style={{color: "#fff"}}>
                Adikt <small><i>powered by Jorge Bayona</i></small>
            </a>
        </nav>
    );
}

export default Nav;
