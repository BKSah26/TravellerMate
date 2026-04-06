import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="main-header">
            <nav className="container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="icon">✈️</span>
                        <h1>TravellerMate</h1>
                    </Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Discover</Link></li>
                    <li><Link to="/planner" className={location.pathname === '/planner' ? 'active' : ''}>Plan a Trip</Link></li>
                    <li><Link to="/my-trips" className={location.pathname === '/my-trips' ? 'active' : ''}>My Trips</Link></li>
                </ul>
                <div className="user-actions">
                    <button className="btn btn-secondary">Login</button>
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </nav>
        </header>
    );
}
