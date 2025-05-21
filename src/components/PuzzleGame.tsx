import {FC, useState, DragEvent, useEffect} from 'react';
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
    // Load saved state or initialize new state
    const [tiles, setTiles] = useState<Tile[]>(() => {
        const savedTiles = localStorage.getItem('puzzleTiles');
        return savedTiles ? JSON.parse(savedTiles) : shuffle(initialTiles);
    });
    
    const [draggedTile, setDraggedTile] = useState<number | null>(null);
    
    const [placedTiles, setPlacedTiles] = useState<boolean[]>(() => {
        const savedPlacedTiles = localStorage.getItem('puzzlePlacedTiles');
        return savedPlacedTiles ? JSON.parse(savedPlacedTiles) : Array(9).fill(false);
    });
    
    const [placedPieces, setPlacedPieces] = useState<(number | null)[]>(() => {
        const savedPlacedPieces = localStorage.getItem('puzzlePlacedPieces');
        return savedPlacedPieces ? JSON.parse(savedPlacedPieces) : Array(9).fill(null);
    });

    // Save state whenever it changes
    useEffect(() => {
        localStorage.setItem('puzzleTiles', JSON.stringify(tiles));
        localStorage.setItem('puzzlePlacedTiles', JSON.stringify(placedTiles));
        localStorage.setItem('puzzlePlacedPieces', JSON.stringify(placedPieces));
    }, [tiles, placedTiles, placedPieces]);

    const handleReset = () => {
        // Clear localStorage
        localStorage.removeItem('puzzleTiles');
        localStorage.removeItem('puzzlePlacedTiles');
        localStorage.removeItem('puzzlePlacedPieces');
        
        // Reset state
        setTiles(shuffle(initialTiles));
        setPlacedTiles(Array(9).fill(false));
        setPlacedPieces(Array(9).fill(null));
        setDraggedTile(null);
    };

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

        const newPlacedTiles = [...placedTiles];
        const newPlacedPieces = [...placedPieces];

        // If there's already a piece in the target position
        if (placedPieces[dropIndex] !== null) {
            // Find the index of the piece that's being replaced
            const replacedPieceIndex = tiles.indexOf(placedPieces[dropIndex]!);
            if (replacedPieceIndex !== -1) {
                // Mark the replaced piece as not placed
                newPlacedTiles[replacedPieceIndex] = false;
            }
        }

        // Place the new piece
        newPlacedTiles[draggedTile] = true;
        newPlacedPieces[dropIndex] = tiles[draggedTile];

        // Update both states at once
        setPlacedTiles(newPlacedTiles);
        setPlacedPieces(newPlacedPieces);
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
            <div className="puzzle-content">
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
            <button 
                className="reset-button" 
                onClick={handleReset}
            >
                Reset Puzzle
            </button>
        </div>
    );
};

export default PuzzleGame;
