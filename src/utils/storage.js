export const Storage = {
    getUsers() {
        const users = localStorage.getItem('travellermate_users');
        return users ? JSON.parse(users) : [];
    },

    saveUsers(users) {
        localStorage.setItem('travellermate_users', JSON.stringify(users));
    },

    signUp({ name, email, password }) {
        const normalizedEmail = email.trim().toLowerCase();
        const users = this.getUsers();
        const existingUser = users.find((user) => user.email === normalizedEmail);

        if (existingUser) {
            throw new Error('An account with this email already exists.');
        }

        const user = {
            id: Date.now(),
            name: name.trim(),
            email: normalizedEmail,
            password,
            createdAt: new Date().toISOString(),
        };

        this.saveUsers([...users, user]);
        this.setCurrentUser(user);
        return this.getCurrentUser();
    },

    login({ email, password }) {
        const normalizedEmail = email.trim().toLowerCase();
        const user = this.getUsers().find((item) => item.email === normalizedEmail && item.password === password);

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        this.setCurrentUser(user);
        return this.getCurrentUser();
    },

    setCurrentUser(user) {
        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        localStorage.setItem('travellermate_current_user', JSON.stringify(publicUser));
        window.dispatchEvent(new Event('travellermate_auth_change'));
    },

    getCurrentUser() {
        const user = localStorage.getItem('travellermate_current_user');
        return user ? JSON.parse(user) : null;
    },

    logout() {
        localStorage.removeItem('travellermate_current_user');
        window.dispatchEvent(new Event('travellermate_auth_change'));
    },

    saveTrip(trip) {
        const trips = this.getAllTrips();
        const currentUser = this.getCurrentUser();
        const savedTrip = {
            ...trip,
            id: Date.now(),
            ownerEmail: currentUser?.email || trip.ownerEmail || null,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('travellermate_trips', JSON.stringify([...trips, savedTrip]));
        return savedTrip;
    },

    getTrips() {
        const currentUser = this.getCurrentUser();
        const trips = this.getAllTrips();

        if (!currentUser) return trips.filter((trip) => !trip.ownerEmail);

        return trips.filter((trip) => trip.ownerEmail === currentUser.email || !trip.ownerEmail);
    },

    getAllTrips() {
        const trips = localStorage.getItem('travellermate_trips');
        return trips ? JSON.parse(trips) : [];
    },

    deleteTrip(id) {
        const currentUser = this.getCurrentUser();
        const trips = this.getAllTrips().filter((trip) => {
            if (trip.id !== id) return true;
            return currentUser && trip.ownerEmail && trip.ownerEmail !== currentUser.email;
        });
        localStorage.setItem('travellermate_trips', JSON.stringify(trips));
    },

    savePendingTrip(trip) {
        localStorage.setItem('travellermate_pending_trip', JSON.stringify(trip));
    },

    getPendingTrip() {
        const trip = localStorage.getItem('travellermate_pending_trip');
        return trip ? JSON.parse(trip) : null;
    },

    clearPendingTrip() {
        localStorage.removeItem('travellermate_pending_trip');
    },

    saveUserPrefs(prefs) {
        localStorage.setItem('travellermate_user_prefs', JSON.stringify(prefs));
    },

    getUserPrefs() {
        const prefs = localStorage.getItem('travellermate_user_prefs');
        return prefs ? JSON.parse(prefs) : null;
    }
};
