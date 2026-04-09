import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    buildTripPlan,
    getDestinationByQuery,
    getTripDaysFromDates,
    indiaDestinationCatalog,
    searchDestinations,
    suggestTrip,
} from '../data/plannerData';

const createTraveler = () => ({ gender: 'Male', age: 28 });

export default function Planner() {
    const location = useLocation();
    const [mode, setMode] = useState('plan');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [itinerary, setItinerary] = useState(null);
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

        try {
            const result = handler();
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

    const handleSuggestSubmit = runPlanner(() =>
        suggestTrip({
            startDate: suggestData.startDate,
            endDate: suggestData.endDate,
            budget: suggestData.budget,
            travelers: suggestData.travelers,
            travelType: suggestData.travelType,
        })
    );

    const toggleDay = (dayNum) => {
        setExpandedDays((current) => ({ ...current, [dayNum]: !current[dayNum] }));
    };

    const renderTravelers = (target, travelers) => (
        <div style={{ display: 'grid', gap: '0.85rem' }}>
            {travelers.map((traveler, index) => (
                <div key={`${target}-${index}`} className="planner-traveler-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                        <strong>Traveler {index + 1}</strong>
                        {travelers.length > 1 && (
                            <button type="button" className="planner-text-btn" onClick={() => removeTraveler(target, index)}>
                                Remove
                            </button>
                        )}
                    </div>
                    <div className="planner-inline-grid">
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

    return (
        <section className="section" id="planner">
            <div className="container">
                <div className="section-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h2 className="section-title">Trip Planner</h2>
                    <p className="text-muted" style={{ maxWidth: '760px' }}>
                        India-only itinerary engine with 50 destination knowledge packs, budget-aware routes, date-range planning, and traveler-wise trip setup.
                    </p>
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
                                        <option value="Nature">Nature</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Heritage">Heritage</option>
                                        <option value="Food">Food</option>
                                        <option value="Relaxing">Relaxing</option>
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
                                    Suggest a Trip
                                </button>
                            </form>
                        )}
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
                        <div className="itinerary-banner">
                            <img src={itinerary.bannerUrl} alt={itinerary.title} className="itinerary-banner-img" />
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
                                <p className="text-muted" style={{ marginTop: '0.35rem' }}>{itinerary.travelerSummary}</p>
                            </div>
                            <button className="btn btn-secondary" onClick={resetResult}>Create Another Plan</button>
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
