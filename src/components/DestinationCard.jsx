import { useNavigate } from 'react-router-dom';

export default function DestinationCard({ destination }) {
    const navigate = useNavigate();

    return (
        <div className="card" data-category={destination.category}>
            <img src={destination.image} alt={destination.title} className="card-img" loading="lazy" 
                onError={(e) => e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(destination.title)}`} />
            <div className="card-body">
                <span className="card-tag">{destination.category}</span>
                <h4 className="card-title">{destination.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{destination.description}</p>
                <div className="card-info">
                    <span className="price">{destination.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ color: '#f59e0b' }}>★</span>
                        <span style={{ fontWeight: '600' }}>{destination.rating}</span>
                    </div>
                </div>
                <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '1.5rem' }} 
                    onClick={() => navigate('/planner', { state: { destination: destination.title } })}
                >
                    Plan This Trip
                </button>
            </div>
        </div>
    );
}
