/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ showAlert }) {
    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth_token')
        navigate("/login")
        showAlert("User Logged Out Successfully", "secondary")
    }

    return (
        <div className="sticky-top border-bottom">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid py-1">
                    <span className="px-2 mx-5">
                        <Link className="navbar-brand fw-bolder" to="/">
                            <i className="fa-solid fa-note-sticky me-2" />iNotebook
                        </Link>
                    </span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Other</Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/">Home</Link></li>
                                    <li><Link className="dropdown-item" to="/notes">Notes</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/about">About</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <span className="d-flex px-2 mx-5">
                        <form className="d-flex" role="search" data-bs-toggle="tooltip">
                            <input className="form-control" type="search" id="search-box" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary ms-2" type="submit">Search</button>

                            {!localStorage.getItem('auth_token')
                                ? <Link className="btn btn-primary ms-2" to="/login">Login</Link>
                                : <button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>}
                            <Link className="btn btn-secondary ms-2" to="/signup">Signup</Link>
                        </form>
                    </span>
                </div>
            </nav>
        </div>
    )
}