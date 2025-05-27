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
                        className={`header-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Domů
                    </Link>
                    <Link 
                        to="/puzzle" 
                        className={`header-nav-link ${location.pathname === '/puzzle' ? 'active' : ''}`}
                    >
                        Hrát
                    </Link>
                </nav>
                <div className="logo">
                    <span className="logo-text">Náhodní kolemjdoucí</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
