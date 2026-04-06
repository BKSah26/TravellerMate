import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
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
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Discover</Link></li>
                    <li><Link to="/planner" className={location.pathname === '/planner' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Plan a Trip</Link></li>
                    <li><Link to="/my-trips" className={location.pathname === '/my-trips' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>My Trips</Link></li>
                </ul>
                <div className={`user-actions ${isMobileMenuOpen ? 'open' : ''}`}>
                    <button className="btn btn-secondary">Login</button>
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </nav>
        </header>
    );
}
