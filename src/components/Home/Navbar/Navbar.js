import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [navbarAnimation, setNavbarAnimation] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo")) || null;
        let mounted = true;
        if(user != null) {
            setUser(user);
            fetch('http://localhost:5000/isAdmin', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            })
            .then(res => res.json())
            .then(data => {
                if (mounted) {
                    setIsAdmin(data)
                }
            })
        }
        return () => {
            mounted = false;
        }
    }, [])

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbarAnimation(true);
        }
        else {
            setNavbarAnimation(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    const handleLogout = () => {
        if(user != null) {
            localStorage.removeItem("userInfo");
            history.push("/");
        }
    }

    return (
        <>
            <nav className={"navbar navbar-expand-lg navbar-light bg-white "+ (navbarAnimation ? "sticky-md-top nav-shadow" : "")}>
                <div className="container">
                    <Link to="/home" className="navbar-brand site-name fw-bolder">
                        <span className="ms-2">Antooba</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-lg-center">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page" href="#a">Home</Link>
                            </li>
                           {isAdmin && 
                            <li className="nav-item">
                                    <Link to="/admin" className="nav-link" href="#a">Admin</Link>
                                </li>
                            }
                            <li className="nav-item">
                                <Link to="/home" className="nav-link" href="#a">Product</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#a">Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn login-btn">{user !== null ? "Logout" : "Signup"}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;