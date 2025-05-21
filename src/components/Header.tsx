import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="container header-container">
                <nav className="nav">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/puzzle" 
                        className={`nav-link ${location.pathname === '/puzzle' ? 'active' : ''}`}
                    >
                        Play
                    </Link>
                </nav>
                <div className="logo">
                    <span className="logo-text">Puzzle</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
