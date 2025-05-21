import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Secret.css';

const Secret: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="secret-container">
            <div className="secret-content">
                <h1>Welcome to the Secret Page! 🎉</h1>
                <div className="secret-text">
                    <p>
                        Congratulations on solving the puzzle! You've unlocked this hidden page.
                        This is a special place that only those who complete the puzzle can discover.
                    </p>
                    <p>
                        The puzzle you solved is more than just a game - it's a metaphor for life's challenges.
                        Each piece represents a step in your journey, and just like in life, sometimes pieces
                        need to be moved around before they find their perfect place.
                    </p>
                    <p>
                        Remember: Every challenge you face is like a puzzle piece. It might not seem to fit at first,
                        but with patience and persistence, you'll find its perfect place in your life's picture.
                    </p>
                </div>
                <button 
                    className="back-button"
                    onClick={() => navigate('/puzzle')}
                >
                    Back to Puzzle
                </button>
            </div>
        </div>
    );
};

export default Secret; 