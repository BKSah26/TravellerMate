import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Discover from './pages/Discover';
import Planner from './pages/Planner';
import MyTrips from './pages/MyTrips';

function App() {
  return (
    <Router>
      <Header />
      <main id="app">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
