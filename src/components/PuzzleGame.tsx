import {FC, useState, DragEvent, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './PuzzleGame.css';

type Tile = number | null;

const initialTiles: Tile[] = Array.from({length: 16}, (_, i) => i + 1);

function shuffle(array: Tile[]): Tile[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const PuzzleGame: FC = () => {
    const navigate = useNavigate();
    const [isSolved, setIsSolved] = useState(false);
    
    // Load saved state or initialize new state
    const [tiles, setTiles] = useState<Tile[]>(() => {
        const savedTiles = localStorage.getItem('puzzleTiles');
        return savedTiles ? JSON.parse(savedTiles) : shuffle(initialTiles);
    });
    
    const [draggedTile, setDraggedTile] = useState<number | null>(null);
    
    const [placedTiles, setPlacedTiles] = useState<boolean[]>(() => {
        const savedPlacedTiles = localStorage.getItem('puzzlePlacedTiles');
        return savedPlacedTiles ? JSON.parse(savedPlacedTiles) : Array(16).fill(false);
    });
    
    const [placedPieces, setPlacedPieces] = useState<(number | null)[]>(() => {
        const savedPlacedPieces = localStorage.getItem('puzzlePlacedPieces');
        return savedPlacedPieces ? JSON.parse(savedPlacedPieces) : Array(16).fill(null);
    });

    // Check if puzzle is solved
    useEffect(() => {
        const isPuzzleSolved = placedPieces.every((piece, index) => piece === index + 1);
        if (isPuzzleSolved !== isSolved) {
            setIsSolved(isPuzzleSolved);
            if (isPuzzleSolved) {
                // Dispatch custom event for puzzle solved
                window.dispatchEvent(new Event('puzzleSolved'));
            }
        }
    }, [placedPieces, isSolved]);

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
        setPlacedTiles(Array(16).fill(false));
        setPlacedPieces(Array(16).fill(null));
        setDraggedTile(null);
        setIsSolved(false);

        // Dispatch custom event for reset
        window.dispatchEvent(new Event('puzzleReset'));
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
        if (tile === null) return `${-3 * 125}px ${-3 * 125}px`; // Position for the empty piece
        return `${-(tile - 1) % 4 * 125}px ${-Math.floor((tile - 1) / 4) * 125}px`;
    };

    const handleTileClick = (index: number) => {
        if (placedPieces[index] === null) return;

        // Find the index of the piece in the tiles array
        const pieceIndex = tiles.indexOf(placedPieces[index]!);
        if (pieceIndex === -1) return;

        // Create new arrays for the state updates
        const newPlacedTiles = [...placedTiles];
        const newPlacedPieces = [...placedPieces];

        // Mark the piece as not placed
        newPlacedTiles[pieceIndex] = false;
        newPlacedPieces[index] = null;

        // Update both states at once
        setPlacedTiles(newPlacedTiles);
        setPlacedPieces(newPlacedPieces);
    };

    return (
        <div className="puzzle-container">
            {isSolved && (
                <div className="congratulations">
                    <h2>Gratulujeme! 🎉</h2>
                    <p>Vyřešili jste puzzle!</p>
                    <button 
                        className="secret-button"
                        onClick={() => navigate('/secret')}
                    >
                        Objevit tajemství
                    </button>
                </div>
            )}
            <div className="puzzle-content">
                <div className="grid">
                    {Array(16).fill(null).map((_, index) => (
                        <div
                            key={index}
                            className={`tile ${placedPieces[index] !== null ? 'placed' : 'empty'}`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onClick={() => handleTileClick(index)}
                        >
                            {placedPieces[index] !== null && (
                                <div 
                                    className="tile-image"
                                    style={{
                                        backgroundImage: `url(puzzle-image.jpg)`,
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
                                        backgroundImage: `url(puzzle-image.jpg)`,
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
                Resetovat puzzle
            </button>
        </div>
    );
};

export default PuzzleGame;
