import { FC } from 'react';
import { Link } from 'react-router-dom';
import './AdditionalInfo.css';

const AdditionalInfo: FC = () => {
    return (
        <div className="additional-info-container">
            <div className="additional-info-content">
                <section className="info-section">
                    <h2>📍 Kde</h2>
                    <p>
                        Svatba se bude konat [doplnit místo svatby].<br />
                        Obřad proběhne přímo na místě / na adrese [doplnit adresu].<br />
                        Na místě bude také hostina a večerní oslava, takže se nemusíte nikam přesouvat.
                    </p>
                </section>

                <section className="info-section">
                    <h2>📅 Kdy</h2>
                    <p>
                        Budeme se brát v sobotu 25. října 2025.<br /><br />
                        Přesný čas obřadu ještě upřesníme, ale počítejte přibližně s odpoledními hodinami.<br />
                        Prosíme, dorazte alespoň 30 minut předem, ať máme čas se přivítat (a doladit poslední detaily 😊).
                    </p>
                </section>

                <section className="info-section">
                    <h2>👗 Jak se obléct</h2>
                    <p>
                        Rádi bychom vás poprosili o [např. formální / polofomální / slavnostní ale pohodlný] dresscode.<br /><br />
                        Pro pány: oblek nebo košile a kalhoty.<br />
                        Pro dámy: šaty, sukně nebo slavnostnější outfit.<br /><br />
                        Nemusíte nic přehánět – hlavně se cítit dobře!<br />
                        Pokud plánujete podpatky, vezměte prosím v potaz terén (tráva, dlažba, …).
                    </p>
                </section>

                <section className="info-section">
                    <h2>🎁 Dary</h2>
                    <p>
                        Vaše přítomnost je pro nás ten největší dárek.<br />
                        Pokud byste nám ale přeci jen chtěli něco darovat, budeme rádi za [doplnit: finanční příspěvek / konkrétní přání / dar ve formě zážitku / libovolný nápad od srdce].<br /><br />
                        Případně jsme připravili jednoduchý seznam přání, který najdete [odkaz na seznam / kontakt].
                    </p>
                </section>

                <section className="info-section">
                    <h2>⏰ Harmonogram dne</h2>
                    <p>
                        Příkladný harmonogram můžeš upravit podle potřeb:
                    </p>
                    <ul>
                        <li>13:30 – příjezd hostů</li>
                        <li>14:00 – svatební obřad</li>
                        <li>15:00 – focení a welcome drink</li>
                        <li>16:00 – sváteční oběd</li>
                        <li>18:00 – krájení dortu</li>
                        <li>19:00 – první tanec a večerní zábava</li>
                        <li>22:00 – půlnoční překvapení</li>
                    </ul>
                    <p>(Přesné časy se ještě mohou změnit, ale dáme vám včas vědět.)</p>
                </section>

                <section className="info-section">
                    <h2>🛏 Přespání a ubytování</h2>
                    <p>
                        Na místě je možnost přespání pro omezený počet lidí.<br />
                        Pokud máte zájem o ubytování, napište nám co nejdříve – budeme ubytování řešit podle pořadí.<br /><br />
                        Další možností je ubytovat se v okolí – doporučujeme například:
                    </p>
                    <ul>
                        <li>[Název hotelu 1] – [vzdálenost od místa]</li>
                        <li>[Název penzionu 2] – [vzdálenost od místa]</li>
                    </ul>
                    <p>(Pokud pojedete autem a neplánujete pít, lze se večer i vracet domů – bude zajištěno parkování.)</p>
                </section>
            </div>
        </div>
    );
};

export default AdditionalInfo; 