import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Secret.css';

const Secret: FC = () => {
    return (
        <div className="secret-container">
            <div className="secret-content">
                <div className="wedding-invitation">
                    <h1>Svatební Pozvánka</h1>
                    <div className="couple-names">
                        <h2>Chiisai & Míša</h2>
                    </div>
                    <div className="invitation-details">
                        <p className="date">25. Říjen 2025</p>
                        <p className="time">16:00</p>
                        <p className="location">The Grand Garden</p>
                        <p className="address">123 Love Lane, Romance City</p>
                    </div>
                    <div className="rsvp-section">
                        <p>Prosíme o potvrzení účasti do 15. Září 2025</p>
                        <p className="contact">Kontakt: (555) 123-4567</p>
                    </div>
                    <div className="message">
                        <p>
                            S radostí Vás zveme na naši svatbu,
                            kde budeme slavit naši lásku a závazek k sobě navzájem.
                            Vaše přítomnost by pro nás znamenala svět.
                        </p>
                    </div>
                    <div className="additional-info-link">
                        <Link to="/additional-info">Více informací</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Secret; 