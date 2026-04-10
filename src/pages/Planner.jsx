import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    buildTripPlan,
    getTripRecommendations,
    getDestinationByQuery,
    getTripDaysFromDates,
    indiaDestinationCatalog,
    searchDestinations,
    travelTypeOptions,
} from '../data/plannerData';
import { Storage } from '../utils/storage';

const createTraveler = () => ({ name: '', gender: 'Male', age: 28 });

const bannerImages = [
    'https://plus.unsplash.com/premium_vector-1718387200528-d786c6e7d820?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_vector-1711979204455-4c6685665bdb?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://images.unsplash.com/vector-1749023606343-99b05f722b4d?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_vector-1682298683439-45f9fdbd99c6?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_vector-1711987478533-5aa44c500e90?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_vector-1711920019147-9e6bd4737e26?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_vector-1721291624803-50f338f7d730?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_vector-1721291624826-ff0f8c06b534?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_vector-1711987326021-7fe5d7d400f8?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_vector-1682268635078-5f60337cb4a3?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
];

const getRandomBannerImage = () => bannerImages[Math.floor(Math.random() * bannerImages.length)];
const bookingOptions = [
    { title: 'Book Flights', description: 'Compare airfare and flight timings on Skyscanner.', href: 'https://www.skyscanner.co.in/', emoji: '✈️' },
    { title: 'Book Trains', description: 'Check train routes and ticket booking on IRCTC.', href: 'https://www.irctc.co.in/nget/train-search', emoji: '🚆' },
    { title: 'Book Hotels', description: 'Browse stays and room options on Booking.com.', href: 'https://www.booking.com/', emoji: '🏨' },
];

export default function Planner() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mode, setMode] = useState('plan');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [itinerary, setItinerary] = useState(null);
    const [suggestedPlaces, setSuggestedPlaces] = useState([]);
    const [bannerImage, setBannerImage] = useState(bannerImages[0]);
    const [pendingTrip, setPendingTrip] = useState(null);
    const [isTripSaved, setIsTripSaved] = useState(false);
    const [expandedDays, setExpandedDays] = useState({});
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [planData, setPlanData] = useState({
        destinationQuery: '',
        startDate: '',
        endDate: '',
        budget: 'Moderate',
        travelers: [createTraveler()],
    });
    const [suggestData, setSuggestData] = useState({
        startDate: '',
        endDate: '',
        budget: 'Moderate',
        travelType: 'Nature',
        travelers: [createTraveler()],
    });

    useEffect(() => {
        const destination = location.state?.destination;
        if (!destination) return;

        setMode('plan');
        setPlanData((current) => ({
            ...current,
            destinationQuery: destination,
        }));
    }, [location.state]);

    const planSuggestions = searchDestinations(planData.destinationQuery);
    const planDays = getTripDaysFromDates(planData.startDate, planData.endDate);
    const suggestDays = getTripDaysFromDates(suggestData.startDate, suggestData.endDate);
    const exactDestinationMatch = getDestinationByQuery(planData.destinationQuery);
    const showNotFound = planData.destinationQuery.trim().length > 1 && !exactDestinationMatch && planSuggestions.length === 0;

    const resetResult = () => {
        setItinerary(null);
        setSuggestedPlaces([]);
        setBannerImage(bannerImages[0]);
        setPendingTrip(null);
        setIsTripSaved(false);
        setError(null);
        setExpandedDays({});
    };

    const updateTravelers = (target, nextTravelers) => {
        if (target === 'plan') {
            setPlanData((current) => ({ ...current, travelers: nextTravelers }));
            return;
        }
        setSuggestData((current) => ({ ...current, travelers: nextTravelers }));
    };

    const changeTraveler = (target, index, field, value) => {
        const source = target === 'plan' ? planData.travelers : suggestData.travelers;
        const next = source.map((traveler, travelerIndex) =>
            travelerIndex === index ? { ...traveler, [field]: field === 'age' ? value : value } : traveler
        );
        updateTravelers(target, next);
    };

    const addTraveler = (target) => {
        const source = target === 'plan' ? planData.travelers : suggestData.travelers;
        updateTravelers(target, [...source, createTraveler()]);
    };

    const removeTraveler = (target, index) => {
        const source = target === 'plan' ? planData.travelers : suggestData.travelers;
        if (source.length === 1) return;
        updateTravelers(target, source.filter((_, travelerIndex) => travelerIndex !== index));
    };

    const runPlanner = (handler) => (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setItinerary(null);
        setSuggestedPlaces([]);
        setPendingTrip(null);
        setIsTripSaved(false);

        try {
            const result = handler();
            const nextBannerImage = getRandomBannerImage();
            const sourceData = mode === 'plan' ? planData : suggestData;
            setBannerImage(nextBannerImage);
            setPendingTrip({
                destination: result.title.replace(/^\d+\s+Days in\s+/i, ''),
                title: result.title,
                dateRange: `${result.days[0]?.dateLabel || ''} - ${result.days[result.days.length - 1]?.dateLabel || ''}`,
                startDate: sourceData.startDate,
                endDate: sourceData.endDate,
                budget: result.budgetLabel,
                totalEstimatedCost: result.totalEstimatedCost,
                travelerSummary: result.travelerSummary,
                itinerarySummary: result.overview,
                image: nextBannerImage,
                days: result.days.length,
            });
            setItinerary(result);
            setExpandedDays({ 1: true });
        } catch (plannerError) {
            setError(plannerError.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlanSubmit = runPlanner(() =>
        buildTripPlan({
            destinationQuery: planData.destinationQuery,
            startDate: planData.startDate,
            endDate: planData.endDate,
            budget: planData.budget,
            travelers: planData.travelers,
        })
    );

    const handleSuggestSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setItinerary(null);
        setPendingTrip(null);
        setIsTripSaved(false);

        try {
            const recommendations = getTripRecommendations({
                startDate: suggestData.startDate,
                endDate: suggestData.endDate,
                travelType: suggestData.travelType,
            });
            setSuggestedPlaces(recommendations);
        } catch (plannerError) {
            setError(plannerError.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestedPlaceSelect = (destinationName) => {
        setIsLoading(true);
        setError(null);
        setItinerary(null);
        setPendingTrip(null);
        setIsTripSaved(false);

        try {
            const result = buildTripPlan({
                destinationQuery: destinationName,
                startDate: suggestData.startDate,
                endDate: suggestData.endDate,
                budget: suggestData.budget,
                travelers: suggestData.travelers,
            });
            const nextBannerImage = getRandomBannerImage();
            setBannerImage(nextBannerImage);
            setPendingTrip({
                destination: result.title.replace(/^\d+\s+Days in\s+/i, ''),
                title: result.title,
                dateRange: `${result.days[0]?.dateLabel || ''} - ${result.days[result.days.length - 1]?.dateLabel || ''}`,
                startDate: suggestData.startDate,
                endDate: suggestData.endDate,
                budget: result.budgetLabel,
                totalEstimatedCost: result.totalEstimatedCost,
                travelerSummary: result.travelerSummary,
                itinerarySummary: result.overview,
                image: nextBannerImage,
                days: result.days.length,
            });
            setItinerary(result);
            setExpandedDays({ 1: true });
        } catch (plannerError) {
            setError(plannerError.message);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDay = (dayNum) => {
        setExpandedDays((current) => ({ ...current, [dayNum]: !current[dayNum] }));
    };

    const renderTravelers = (target, travelers) => (
        <div style={{ display: 'grid', gap: '0.85rem' }}>
            {travelers.map((traveler, index) => (
                <div key={`${target}-${index}`} className="planner-traveler-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                        <strong>Traveler Details</strong>
                        {travelers.length > 1 && (
                            <button type="button" className="planner-text-btn" onClick={() => removeTraveler(target, index)}>
                                Remove
                            </button>
                        )}
                    </div>
                    <div className="planner-inline-grid">
                        <div>
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="planner-input"
                                value={traveler.name}
                                onChange={(event) => changeTraveler(target, index, 'name', event.target.value)}
                                placeholder="Enter traveler name"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Gender</label>
                            <select className="planner-input" value={traveler.gender} onChange={(event) => changeTraveler(target, index, 'gender', event.target.value)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                className="planner-input"
                                value={traveler.age}
                                onChange={(event) => changeTraveler(target, index, 'age', event.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" className="planner-add-btn" onClick={() => addTraveler(target)}>
                Add Traveler
            </button>
        </div>
    );

    const itineraryTravelerNames = itinerary?.travelers?.map((traveler) => traveler.name).filter(Boolean) || [];
    const itineraryTravelerSummary = itinerary
        ? `${itineraryTravelerNames.length ? `${itineraryTravelerNames.join(', ')} • ` : ''}${itinerary.travelerSummary}`
        : '';
    const itineraryDestinationName = itinerary?.title?.replace(/^\d+\s+Days in\s+/i, '') || '';
    const itineraryMapUrl = itineraryDestinationName
        ? `https://www.google.com/maps?q=${encodeURIComponent(`${itineraryDestinationName}, India`)}&z=11&output=embed`
        : '';

    const handleAddToMyTrips = () => {
        if (!pendingTrip || isTripSaved) return;

        if (!Storage.getCurrentUser()) {
            Storage.savePendingTrip(pendingTrip);
            navigate('/login', {
                state: {
                    from: '/planner',
                    message: 'Login first, and TravellerMate will save this generated itinerary to My Trips automatically.',
                },
            });
            return;
        }

        const existingTrip = Storage.getTrips().find((trip) =>
            trip.title === pendingTrip.title && trip.startDate === pendingTrip.startDate && trip.endDate === pendingTrip.endDate
        );

        if (!existingTrip) {
            Storage.saveTrip(pendingTrip);
        }

        setIsTripSaved(true);
    };

    return (
        <section className="section" id="planner">
            <div className="container">
                <div className="section-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h2 className="section-title">Trip Planner</h2>
                </div>

                {!itinerary && !isLoading && !error && (
                    <div className="filters" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
                        <button type="button" className={mode === 'plan' ? 'filter-btn active' : 'filter-btn'} onClick={() => setMode('plan')}>
                            Plan a Trip
                        </button>
                        <button type="button" className={mode === 'suggest' ? 'filter-btn active' : 'filter-btn'} onClick={() => setMode('suggest')}>
                            Suggest a Trip
                        </button>
                    </div>
                )}

                {!itinerary && !isLoading && !error && (
                    <div className="glass planner-shell">
                        {mode === 'plan' ? (
                            <form onSubmit={handlePlanSubmit}>
                                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                                    <label className="form-label">Destination</label>
                                    <input
                                        type="text"
                                        className="planner-input"
                                        placeholder="Type a place in India, e.g. Jaipur, Leh, Varanasi"
                                        value={planData.destinationQuery}
                                        onChange={(event) => {
                                            setPlanData((current) => ({ ...current, destinationQuery: event.target.value }));
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                        required
                                    />
                                    {showSuggestions && planSuggestions.length > 0 && (
                                        <div className="planner-suggestions">
                                            {planSuggestions.map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    className="planner-suggestion-item"
                                                    onClick={() => {
                                                        setPlanData((current) => ({ ...current, destinationQuery: item.name }));
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    <strong>{item.name}</strong>
                                                    <span>{item.state}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {showNotFound && <p className="planner-helper planner-error">Place not found in our India travel database.</p>}
                                    {!showNotFound && exactDestinationMatch && (
                                        <p className="planner-helper">
                                            Match found: {exactDestinationMatch.name}, {exactDestinationMatch.state}. Minimum recommended stay: {exactDestinationMatch.minDays} days.
                                        </p>
                                    )}
                                </div>

                                <div className="planner-inline-grid" style={{ marginBottom: '1.5rem' }}>
                                    <div>
                                        <label className="form-label">Start Date</label>
                                        <input type="date" className="planner-input" value={planData.startDate} onChange={(event) => setPlanData((current) => ({ ...current, startDate: event.target.value }))} required />
                                    </div>
                                    <div>
                                        <label className="form-label">End Date</label>
                                        <input type="date" className="planner-input" value={planData.endDate} min={planData.startDate || undefined} onChange={(event) => setPlanData((current) => ({ ...current, endDate: event.target.value }))} required />
                                    </div>
                                    <div>
                                        <label className="form-label">Budget Range</label>
                                        <select className="planner-input" value={planData.budget} onChange={(event) => setPlanData((current) => ({ ...current, budget: event.target.value }))}>
                                            <option value="Economical">Economical</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Luxury">Luxury</option>
                                        </select>
                                    </div>
                                </div>

                                <p className="planner-helper" style={{ marginBottom: '1.5rem' }}>
                                    {planDays ? `${planDays} travel day${planDays > 1 ? 's' : ''} selected.` : 'Select start and end dates to calculate trip duration.'}
                                </p>

                                <div style={{ marginBottom: '1.75rem' }}>
                                    <label className="form-label">Travelers</label>
                                    {renderTravelers('plan', planData.travelers)}
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Generate Day-wise Itinerary
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleSuggestSubmit}>
                                <div className="planner-inline-grid" style={{ marginBottom: '1.5rem' }}>
                                    <div>
                                        <label className="form-label">Start Date</label>
                                        <input type="date" className="planner-input" value={suggestData.startDate} onChange={(event) => setSuggestData((current) => ({ ...current, startDate: event.target.value }))} required />
                                    </div>
                                    <div>
                                        <label className="form-label">End Date</label>
                                        <input type="date" className="planner-input" value={suggestData.endDate} min={suggestData.startDate || undefined} onChange={(event) => setSuggestData((current) => ({ ...current, endDate: event.target.value }))} required />
                                    </div>
                                    <div>
                                        <label className="form-label">Budget Range</label>
                                        <select className="planner-input" value={suggestData.budget} onChange={(event) => setSuggestData((current) => ({ ...current, budget: event.target.value }))}>
                                            <option value="Economical">Economical</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Luxury">Luxury</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label">Travel Style</label>
                                    <select className="planner-input" value={suggestData.travelType} onChange={(event) => setSuggestData((current) => ({ ...current, travelType: event.target.value }))}>
                                        {travelTypeOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <p className="planner-helper" style={{ marginBottom: '1.5rem' }}>
                                    {suggestDays ? `${suggestDays} travel day${suggestDays > 1 ? 's' : ''} selected across ${indiaDestinationCatalog.length} India destinations.` : 'Select dates and travel style for a destination suggestion.'}
                                </p>

                                <div style={{ marginBottom: '1.75rem' }}>
                                    <label className="form-label">Travelers</label>
                                    {renderTravelers('suggest', suggestData.travelers)}
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Find Matching Destinations
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {!itinerary && !isLoading && !error && mode === 'suggest' && suggestedPlaces.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                            <div>
                                <h3 className="section-title" style={{ fontSize: '1.65rem' }}>Suggested Destinations</h3>
                                <p>Pick any place below to generate the full day-wise itinerary.</p>
                            </div>
                            <p className="planner-helper">{suggestedPlaces.length} seasonal match{suggestedPlaces.length !== 1 ? 'es' : ''}</p>
                        </div>
                        <div className="my-trips-grid">
                            {suggestedPlaces.map((place) => (
                                <article key={place.slug} className="card trip-card">
                                    <div className="my-trip-banner" style={{ backgroundImage: `url(${place.image})` }}>
                                        <span className="my-trip-status upcoming">{place.category}</span>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title" style={{ marginBottom: '0.35rem' }}>{place.name}</h3>
                                        <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>{place.state}</p>
                                        <p className="text-muted" style={{ fontSize: '0.95rem' }}>{place.summary}</p>
                                        <div className="my-trip-meta">
                                            <span><strong>Best season:</strong> {place.bestSeason}</span>
                                            <span><strong>Ideal duration:</strong> {place.idealDays} days</span>
                                            <span><strong>Styles:</strong> {place.styles.slice(0, 4).join(', ')}</span>
                                        </div>
                                        <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem' }} onClick={() => handleSuggestedPlaceSelect(place.name)}>
                                            Generate Itinerary
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <h3 className="section-title">Generating your trip...</h3>
                        <p className="text-muted">Building the route, budgets, and day-wise schedule.</p>
                    </div>
                )}

                {error && (
                    <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: '#b91c1c', borderColor: '#fecaca', maxWidth: '720px', margin: '0 auto', borderRadius: '24px' }}>
                        <h3>Planner issue</h3>
                        <p style={{ marginTop: '0.85rem', opacity: 0.9 }}>{error}</p>
                        <button className="btn btn-secondary" style={{ marginTop: '1.2rem' }} onClick={resetResult}>
                            Go Back
                        </button>
                    </div>
                )}

                {itinerary && (
                    <div className="itinerary-result">
                        <div className="itinerary-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
                            <div className="itinerary-banner-overlay">
                                <div className="itinerary-banner-content">
                                    <span className="itinerary-badge">{itinerary.budgetLabel} plan</span>
                                    <h2 className="itinerary-title">{itinerary.title}</h2>
                                    <p className="itinerary-subtitle">{itinerary.overview}</p>
                                </div>
                            </div>
                        </div>

                        <div className="itinerary-controls" style={{ justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Your Custom Plan</h3>
                                <p className="text-muted" style={{ marginTop: '0.35rem' }}>{itineraryTravelerSummary}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <button className={isTripSaved ? 'btn btn-secondary' : 'btn btn-primary'} onClick={handleAddToMyTrips} type="button">
                                    {isTripSaved ? 'Added to My Trips' : 'Add to My Trips'}
                                </button>
                                <button className="btn btn-secondary" onClick={resetResult} type="button">Create Another Plan</button>
                            </div>
                        </div>

                        <div className="budget-breakdown glass">
                            <h3 className="budget-title">Estimated Budget</h3>
                            <p className="budget-note">Total Estimated Cost: <strong>{itinerary.totalEstimatedCost}</strong></p>
                            <p className="planner-helper" style={{ marginBottom: '1.5rem' }}>{itinerary.planningNote}</p>

                            <div className="budget-table">
                                <div className="budget-header">
                                    <div>Category</div>
                                    <div>Cost</div>
                                    <div>Percentage</div>
                                </div>
                                {itinerary.budgetBreakdown.map((item) => (
                                    <div className="budget-row" key={item.category}>
                                        <div className="budget-cat">{item.category}</div>
                                        <div className="budget-total">{item.estimatedCost}</div>
                                        <div className="budget-per">{item.percentage}%</div>
                                    </div>
                                ))}
                                <div className="budget-grand">
                                    <span>Total Estimation</span>
                                    <span>{itinerary.totalEstimatedCost}</span>
                                </div>
                            </div>
                        </div>

                        <div className="booking-panel glass">
                            <div style={{ marginBottom: '1.25rem' }}>
                                <h3 className="budget-title">Booking Shortcuts</h3>
                                <p className="planner-helper">Continue your plan with quick booking links for flights, trains, and hotels.</p>
                            </div>
                            <div className="booking-grid">
                                {bookingOptions.map((option) => (
                                    <a key={option.title} href={option.href} target="_blank" rel="noreferrer" className="booking-card">
                                        <span className="booking-emoji">{option.emoji}</span>
                                        <div>
                                            <strong>{option.title}</strong>
                                            <p>{option.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="booking-panel glass">
                            <div style={{ marginBottom: '1.25rem' }}>
                                <h3 className="budget-title">Destination Map</h3>
                                <p className="planner-helper">Quick location view for {itineraryDestinationName} on Google Maps.</p>
                            </div>
                            <div className="map-frame-wrap">
                                <iframe
                                    title={`${itineraryDestinationName} map`}
                                    src={itineraryMapUrl}
                                    className="map-frame"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        <div className="day-accordion">
                            {itinerary.days.map((day) => {
                                const isExpanded = expandedDays[day.dayNumber];
                                return (
                                    <div className={`day-card ${isExpanded ? 'expanded' : ''}`} key={day.dayNumber}>
                                        <button type="button" className="day-card-header" onClick={() => toggleDay(day.dayNumber)}>
                                            <div style={{ textAlign: 'left' }}>
                                                <span className="day-number">Day {day.dayNumber}</span>
                                                <span className="day-theme">{day.theme}</span>
                                                <span className="planner-helper" style={{ display: 'block', marginTop: '0.35rem' }}>{day.dateLabel}</span>
                                            </div>
                                            <span className="day-chevron" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                                        </button>
                                        <div className="day-card-body">
                                            <div className="planner-expense-grid">
                                                <div><strong>Stay</strong><span>{Math.round(day.dayExpense.stay).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span></div>
                                                <div><strong>Food</strong><span>{Math.round(day.dayExpense.food).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span></div>
                                                <div><strong>Transport</strong><span>{Math.round(day.dayExpense.localTransport).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span></div>
                                                <div><strong>Activities</strong><span>{Math.round(day.dayExpense.activities + day.dayExpense.extras).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span></div>
                                                <div><strong>Day Total</strong><span>{Math.round(day.dayExpense.total).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span></div>
                                            </div>
                                            <div className="day-timeline">
                                                {day.activities.map((activity, index) => (
                                                    <div className="timeline-slot" key={`${day.dayNumber}-${index}`}>
                                                        <div className="timeline-slot-header">
                                                            <span className="slot-badge">{activity.timeWindow}</span>
                                                        </div>
                                                        <div className="timeline-activity">
                                                            <span className="activity-emoji">{activity.emoji}</span>
                                                            <div>
                                                                <span className="activity-name">{activity.name}</span>
                                                                <p className="activity-desc">{activity.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
