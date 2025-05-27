import { FC } from 'react';
import './Home.css';

const Home: FC = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h2 className="page-title">Vítej!</h2>
                <h1>Vítej!</h1>
                <p>Náhodní kolemjdoucí tě zvou na malou hru.</p>
                <p>Pokud máš chvíli čas a chuť na trochu zábavy, klikni v menu na „Hrát" a ponoř se do tajemství, které jsme pro tebe připravili.</p>
            </div>
        </div>
    );
};

export default Home;
