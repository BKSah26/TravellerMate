import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Storage } from '../utils/storage';

export default function Header() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(() => Storage.getCurrentUser());

    useEffect(() => {
        const syncUser = () => setCurrentUser(Storage.getCurrentUser());

        window.addEventListener('storage', syncUser);
        window.addEventListener('travellermate_auth_change', syncUser);

        return () => {
            window.removeEventListener('storage', syncUser);
            window.removeEventListener('travellermate_auth_change', syncUser);
        };
    }, []);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => setIsMobileMenuOpen(false);

    const handleLogout = () => {
        Storage.logout();
        closeMenu();
    };

    return (
        <header className="main-header">
            <nav className="container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="icon">✈️</span>
                        <h1>TravellerMate</h1>
                    </Link>
                </div>
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
                <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Discover</Link></li>
                    <li><Link to="/planner" className={location.pathname === '/planner' ? 'active' : ''} onClick={closeMenu}>Plan a Trip</Link></li>
                    <li><Link to="/my-trips" className={location.pathname === '/my-trips' ? 'active' : ''} onClick={closeMenu}>My Trips</Link></li>
                </ul>
                <div className={`user-actions ${isMobileMenuOpen ? 'open' : ''}`}>
                    {currentUser ? (
                        <>
                            <span className="user-pill">Hi, {currentUser.name.split(' ')[0]}</span>
                            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-secondary nav-auth-btn" to="/login" onClick={closeMenu}>Login</Link>
                            <Link className="btn btn-primary nav-auth-btn" to="/signup" onClick={closeMenu}>Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
