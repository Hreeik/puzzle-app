import {FC, useState, DragEvent} from 'react';
import './PuzzleGame.css';

type Tile = number | null;

const initialTiles: Tile[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle(array: Tile[]): Tile[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const PuzzleGame: FC = () => {
    const [tiles, setTiles] = useState<Tile[]>(shuffle(initialTiles));
    const [draggedTile, setDraggedTile] = useState<number | null>(null);
    const [placedTiles, setPlacedTiles] = useState<boolean[]>(Array(9).fill(false));
    const [placedPieces, setPlacedPieces] = useState<(number | null)[]>(Array(9).fill(null));

    const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
        if (!placedTiles[index]) {
            setDraggedTile(index);
            e.dataTransfer.effectAllowed = 'move';
            e.currentTarget.classList.add('dragging');
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault();
        if (draggedTile === null) return;

        // Check if the piece is being placed in its correct position
        const isCorrectPosition = tiles[draggedTile] === dropIndex + 1 || 
                                (tiles[draggedTile] === null && dropIndex === 8);
        
        if (isCorrectPosition) {
            const newPlacedTiles = [...placedTiles];
            newPlacedTiles[draggedTile] = true;
            setPlacedTiles(newPlacedTiles);

            const newPlacedPieces = [...placedPieces];
            newPlacedPieces[dropIndex] = tiles[draggedTile];
            setPlacedPieces(newPlacedPieces);
        }
        
        setDraggedTile(null);
    };

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        setDraggedTile(null);
        e.currentTarget.classList.remove('dragging');
    };

    const getBackgroundPosition = (tile: Tile) => {
        if (tile === null) return `${-2 * 100}px ${-2 * 100}px`; // Position for the empty piece
        return `${-(tile - 1) % 3 * 100}px ${-Math.floor((tile - 1) / 3) * 100}px`;
    };

    return (
        <div className="puzzle-container">
            <div className="grid">
                {Array(9).fill(null).map((_, index) => (
                    <div
                        key={index}
                        className={`tile ${placedPieces[index] !== null ? 'placed' : 'empty'}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        {placedPieces[index] !== null && (
                            <div 
                                className="tile-image"
                                style={{
                                    backgroundImage: `url(/src/assets/puzzle-image.jpg)`,
                                    backgroundPosition: getBackgroundPosition(placedPieces[index])
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="pieces-container">
                {tiles.map((tile, index) => (
                    !placedTiles[index] && (
                        <div
                            key={index}
                            className="piece"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                        >
                            <div 
                                className="tile-image"
                                style={{
                                    backgroundImage: `url(/src/assets/puzzle-image.jpg)`,
                                    backgroundPosition: getBackgroundPosition(tile)
                                }}
                            />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default PuzzleGame;
