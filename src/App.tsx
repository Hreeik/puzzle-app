import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Puzzle from './pages/Puzzle';

const App = () => {
    return <Router>
            <nav style={{ margin: '20px' }}>
                <Link to="/" style={{ marginRight: '15px' }}>Domů</Link>
                <Link to="/puzzle">Puzzle</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/puzzle" element={<Puzzle />} />
            </Routes>
        </Router>
}

export default App;
