import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);

    useEffect(() => {
        // Check if puzzle is solved by looking at localStorage
        const checkPuzzleSolved = () => {
            const placedPieces = localStorage.getItem('puzzlePlacedPieces');
            if (placedPieces) {
                const pieces = JSON.parse(placedPieces);
                const solved = pieces.every((piece: number | null, index: number) => piece === index + 1);
                setIsPuzzleSolved(solved);
            } else {
                setIsPuzzleSolved(false);
            }
        };

        // Initial check
        checkPuzzleSolved();
        
        // Listen for puzzle solved event
        const handlePuzzleSolved = () => {
            setIsPuzzleSolved(true);
        };

        // Listen for puzzle reset event
        const handlePuzzleReset = () => {
            setIsPuzzleSolved(false);
        };
        
        window.addEventListener('puzzleSolved', handlePuzzleSolved);
        window.addEventListener('puzzleReset', handlePuzzleReset);
        window.addEventListener('storage', checkPuzzleSolved);
        
        return () => {
            window.removeEventListener('puzzleSolved', handlePuzzleSolved);
            window.removeEventListener('puzzleReset', handlePuzzleReset);
            window.removeEventListener('storage', checkPuzzleSolved);
        };
    }, []);

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
                    {isPuzzleSolved && (
                        <>
                            <Link 
                                to="/secret" 
                                className={`header-nav-link ${location.pathname === '/secret' ? 'active' : ''}`}
                            >
                                Pozvánka
                            </Link>
                            <Link 
                                to="/additional-info" 
                                className={`header-nav-link ${location.pathname === '/additional-info' ? 'active' : ''}`}
                            >
                                Informace
                            </Link>
                        </>
                    )}
                </nav>
                <div className="logo">
                    <span className="logo-text">Náhodní kolemjdoucí</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
