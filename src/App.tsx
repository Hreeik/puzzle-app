import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Puzzle from './pages/Puzzle';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/puzzle" element={<Puzzle />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;
