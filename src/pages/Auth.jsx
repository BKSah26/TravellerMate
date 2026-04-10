import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignup = location.pathname === '/signup';
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const pageCopy = useMemo(
        () =>
            isSignup
                ? {
                    eyebrow: 'Create your TravellerMate account',
                    title: 'Start saving trips in your personal travel desk.',
                    button: 'Create Account',
                    switchText: 'Already have an account?',
                    switchLink: '/login',
                    switchLabel: 'Login',
                }
                : {
                    eyebrow: 'Welcome back',
                    title: 'Login to continue planning and saving trips.',
                    button: 'Login',
                    switchText: 'New to TravellerMate?',
                    switchLink: '/signup',
                    switchLabel: 'Sign Up',
                },
        [isSignup]
    );

    const updateField = (field, value) => {
        setFormData((current) => ({ ...current, [field]: value }));
    };

    const savePendingTripAfterAuth = () => {
        const pendingTrip = Storage.getPendingTrip();
        if (!pendingTrip) return false;

        const existingTrip = Storage.getTrips().find((trip) =>
            trip.title === pendingTrip.title && trip.startDate === pendingTrip.startDate && trip.endDate === pendingTrip.endDate
        );

        if (!existingTrip) {
            Storage.saveTrip(pendingTrip);
        }

        Storage.clearPendingTrip();
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        try {
            if (isSignup) {
                Storage.signUp(formData);
            } else {
                Storage.login(formData);
            }

            const savedPendingTrip = savePendingTripAfterAuth();
            navigate(savedPendingTrip ? '/my-trips' : location.state?.from || '/planner', { replace: true });
        } catch (authError) {
            setError(authError.message);
        }
    };

    return (
        <section className="section auth-section">
            <div className="container auth-layout">
                <div className="auth-story">
                    <span className="auth-eyebrow">TravellerMate Secure Access</span>
                    <h2>{pageCopy.title}</h2>
                    <p>
                        Your generated itineraries, dates, budgets, and saved trips stay connected to your account, so the app feels like a personal AI travel workspace.
                    </p>
                    <div className="auth-feature-list">
                        <span>Save generated itineraries</span>
                        <span>Track upcoming, ongoing, and completed trips</span>
                        <span>Keep planning data organized by user</span>
                    </div>
                </div>

                <form className="auth-card glass" onSubmit={handleSubmit}>
                    <p className="auth-eyebrow">{pageCopy.eyebrow}</p>
                    <h3>{isSignup ? 'Sign Up' : 'Login'}</h3>

                    {location.state?.message && <p className="auth-note">{location.state.message}</p>}
                    {error && <p className="auth-error">{error}</p>}

                    {isSignup && (
                        <div>
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="planner-input"
                                value={formData.name}
                                onChange={(event) => updateField('name', event.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="planner-input"
                            value={formData.email}
                            onChange={(event) => updateField('email', event.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="planner-input"
                            value={formData.password}
                            onChange={(event) => updateField('password', event.target.value)}
                            placeholder="Enter password"
                            minLength="6"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit">
                        {pageCopy.button}
                    </button>

                    <p className="auth-switch">
                        {pageCopy.switchText} <Link to={pageCopy.switchLink}>{pageCopy.switchLabel}</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
