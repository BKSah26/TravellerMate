import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Storage } from '../utils/storage';

const getTripStatus = (startDate, endDate) => {
    const now = new Date();
    const tripStart = startDate ? new Date(startDate) : null;
    const tripEnd = endDate ? new Date(endDate) : null;

    if (tripEnd) tripEnd.setHours(23, 59, 59, 999);
    if (tripStart) tripStart.setHours(0, 0, 0, 0);

    if (tripStart && tripStart > now) return 'upcoming';
    if (tripStart && tripEnd && tripStart <= now && tripEnd >= now) return 'ongoing';
    if (tripEnd && tripEnd < now) return 'completed';
    return 'upcoming';
};

export default function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [currentUser, setCurrentUser] = useState(() => Storage.getCurrentUser());
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const syncTrips = () => {
            setCurrentUser(Storage.getCurrentUser());
            setTrips(Storage.getTrips());
        };

        setTrips(Storage.getTrips());
        window.addEventListener('travellermate_auth_change', syncTrips);
        window.addEventListener('storage', syncTrips);

        return () => {
            window.removeEventListener('travellermate_auth_change', syncTrips);
            window.removeEventListener('storage', syncTrips);
        };
    }, []);

    const sortedTrips = useMemo(
        () =>
            [...trips]
                .map((trip) => ({ ...trip, status: getTripStatus(trip.startDate, trip.endDate) }))
                .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt)),
        [trips]
    );

    const filteredTrips = useMemo(
        () => (statusFilter === 'all' ? sortedTrips : sortedTrips.filter((trip) => trip.status === statusFilter)),
        [sortedTrips, statusFilter]
    );

    const handleDelete = (id) => {
        Storage.deleteTrip(id);
        setTrips(Storage.getTrips());
    };

    if (!currentUser) {
        return (
            <section className="section" id="my-trips">
                <div className="container">
                    <div className="glass planner-shell auth-required">
                        <span className="auth-eyebrow">Login Required</span>
                        <h2 className="section-title">Your trips are waiting behind the gate.</h2>
                        <p className="text-muted">Login or create an account to save generated itineraries and track upcoming, ongoing, and completed trips.</p>
                        <div className="auth-required-actions">
                            <Link className="btn btn-primary" to="/login" state={{ from: '/my-trips' }}>Login</Link>
                            <Link className="btn btn-secondary" to="/signup" state={{ from: '/my-trips' }}>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section" id="my-trips">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">My Trips</h2>
                        <p>Trips you explicitly saved from generated itineraries.</p>
                    </div>
                    <p className="planner-helper">{filteredTrips.length} saved trip{filteredTrips.length !== 1 ? 's' : ''}</p>
                </div>

                {sortedTrips.length > 0 && (
                    <div className="filters" style={{ marginBottom: '2rem' }}>
                        {['all', 'upcoming', 'ongoing', 'completed'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                className={statusFilter === status ? 'filter-btn active' : 'filter-btn'}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                )}

                {sortedTrips.length === 0 ? (
                    <div className="glass planner-shell" style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.75rem' }}>No trips yet</h3>
                        <p className="text-muted">Generate an itinerary, then use Add to My Trips whenever you want to save it here.</p>
                    </div>
                ) : filteredTrips.length === 0 ? (
                    <div className="glass planner-shell" style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '0.75rem' }}>No {statusFilter} trips</h3>
                        <p className="text-muted">Try another filter to see the rest of your saved trips.</p>
                    </div>
                ) : (
                    <div className="my-trips-grid">
                        {filteredTrips.map((trip) => (
                            <article key={trip.id} className="card trip-card">
                                <div className="my-trip-banner" style={{ backgroundImage: `url(${trip.image})` }}>
                                    <span className={`my-trip-status ${trip.status}`}>{trip.status}</span>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>{trip.destination}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{trip.dateRange}</p>
                                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>{trip.itinerarySummary}</p>

                                    <div className="my-trip-meta">
                                        <span><strong>Budget:</strong> {trip.budget}</span>
                                        <span><strong>Days:</strong> {trip.days}</span>
                                        <span><strong>Cost:</strong> {trip.totalEstimatedCost}</span>
                                    </div>

                                    <p className="planner-helper" style={{ marginTop: '1rem' }}>{trip.travelerSummary}</p>

                                    <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '1.25rem' }} onClick={() => handleDelete(trip.id)}>
                                        Remove Trip
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
