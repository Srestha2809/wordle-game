import { useCallback, useEffect, useState } from "react";
import type { BoardRowData, GameState, GameStatus, TileState } from "../types";
import { FLIP_TILE, MAX_GUESSES, REVEAL_WORD, WORDLE_SCORE, WORD_LENGTH } from "../utils/constants";
import { validateGuess } from "../services/wordleApi";

//Initialize empty board
const createEmptyBoard = (): BoardRowData[] => {
    return Array(MAX_GUESSES)
      .fill(null)
      .map(() => ({
        tiles: Array(WORD_LENGTH)
          .fill(null)
          .map(() => ({ letter: '', state: 'empty' as TileState })),
        isSubmitted: false,
        isInvalid: false,
      }));
  };

// Initial Game State
const initialGameState: GameState ={
    board: createEmptyBoard(),
    currentRow: 0,
    currentTile: 0,
    gameStatus: 'playing',
    letterStates: new Map()
}

export function useWordle() {
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [isLoading, setIsLoading] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);

    // Add Letters in the Box
    const addLetters = useCallback((letter: string) => {
        if(gameState.gameStatus !== 'playing' || gameState.currentTile >= WORD_LENGTH || isLoading || isRevealing){
            return;
        }
        setGameState((prev) => {
            const newBoard = [...prev.board];
            const currentBoardRowData = {...newBoard[prev.currentRow]};
            const newBoardTiles = [...currentBoardRowData.tiles];

            newBoardTiles[prev.currentTile] = {
                letter: letter.toUpperCase(),
                state: 'deciding'
            }

            currentBoardRowData.tiles = newBoardTiles;
            currentBoardRowData.isInvalid = false;
            newBoard[prev.currentRow] = currentBoardRowData;

            return{
                ...prev,
                board: newBoard,
                currentTile: prev.currentTile + 1
            }
        });

    },[gameState.gameStatus, gameState.currentTile, isLoading, isRevealing]);

    // Remove Last Letter
    const removeLetters = useCallback(() => {
        if(gameState.gameStatus !== 'playing' || gameState.currentTile === 0 || isLoading || isRevealing){
            return;
        }

        setGameState((prev) => {
            const newBoard = [...prev.board];
            const currentBoardRowData = {...newBoard[prev.currentRow]};
            const newBoardTiles = [...currentBoardRowData.tiles];

            newBoardTiles[prev.currentTile - 1] = {
                letter: '',
                state: 'empty'
            }

            currentBoardRowData.tiles = newBoardTiles;
            currentBoardRowData.isInvalid = false;
            newBoard[prev.currentRow] = currentBoardRowData;

            return{
                ...prev,
                board: newBoard,
                currentTile: prev.currentTile - 1
            }
        });

    },[gameState.gameStatus, gameState.currentTile, isLoading, isRevealing]);

    // Submit the current Guess
    const submitCurrentGuess = useCallback(async () => {
        if(gameState.gameStatus !== 'playing' || gameState.currentTile !== WORD_LENGTH || isLoading || isRevealing){
            return {success: false, message: 'Not enough letters'};
        }

        const currentWord = gameState.board[gameState.currentRow].tiles.map((tile) => tile.letter).join('');

        setIsLoading(true);

        try{
            const wordleResult = await validateGuess(currentWord);
            if(!wordleResult.isvalidword){

                //Invalid guess
                setGameState((prev) => {
                    const newBoard = [...prev.board];
                    newBoard[prev.currentRow] = {
                      ...newBoard[prev.currentRow],
                      isInvalid: true,
                    };
                    return { ...prev, board: newBoard };
                  });

                  // Reset invalid state after animation
        setTimeout(() => {
            setGameState((prev) => {
              const newBoard = [...prev.board];
              newBoard[prev.currentRow] = {
                ...newBoard[prev.currentRow],
                isInvalid: false,
              };
              return { ...prev, board: newBoard };
            });
          }, 500);
  
          setIsLoading(false);
          return { success: false, message: 'Not in word list' };
          
            }
            setIsRevealing(true);

            //Update tiles with scores one by one
            const updateLetterStates = new Map(gameState.letterStates);

            wordleResult.score.forEach((score, idx) => {
                const letter = currentWord[idx]
                const letterState = WORDLE_SCORE[score as keyof typeof WORDLE_SCORE] as TileState;
                
                //Update Letter State
                const currentLetterState = updateLetterStates.get(letter);

                if(!currentLetterState || currentLetterState === 'empty' || currentLetterState === 'deciding' || (currentLetterState === 'absent' && letterState !== 'absent') || (currentLetterState === 'present' && letterState === 'correct')){
                    updateLetterStates.set(letter, letterState);
                }

                //Tile flip
                setTimeout(() => {
                    setGameState((prev) => {
                        const newBoard = [...prev.board];
                        const currentBoardRowData = { ...newBoard[prev.currentRow] };
                        const newTiles = [...currentBoardRowData.tiles];
            
                        newTiles[idx] = { ...newTiles[idx], state: letterState };
            
                        currentBoardRowData.tiles = newTiles;
                        newBoard[prev.currentRow] = currentBoardRowData;
            
                        return { ...prev, board: newBoard };
                    });
                  }, idx * FLIP_TILE);

            });

            // Update the Game State once the tiles are revealed
            setTimeout(() => {
                const isWinner = wordleResult.score.every((s) => s === 2);
                const isLastGuess = gameState.currentRow === MAX_GUESSES - 1;
        
                setGameState((prev) => ({
                  ...prev,
                  board: prev.board.map((row, idx) =>
                    idx === prev.currentRow ? { ...row, isSubmitted: true } : row
                  ),
                  currentRow: prev.currentRow + 1,
                  currentTile: 0,
                  gameStatus: isWinner ? 'won' : isLastGuess ? 'lost' : 'playing',
                  letterStates: updateLetterStates,
                }));
        
                setIsRevealing(false);
                setIsLoading(false);
              }, REVEAL_WORD);
        
              return { success: true, isWinner: wordleResult.score.every((s) => s === 2) };
        }catch (error) {
            setIsLoading(false);
            setIsRevealing(false);
            return { success: false, message: 'Error validating word' };
          }

    },[gameState, isLoading, isRevealing]);

    // Handle letter and backspace Keyboard Inputs ONLY
    const handleKeyPress = useCallback((key: string) => {
        if(isLoading ||  isRevealing) return;
        if(key === 'BACKSPACE'){
            removeLetters();
        }else if (/^[A-Z]$/.test(key)){
            addLetters(key)
        }
    },[addLetters, removeLetters, isLoading, isRevealing]);

    // Reset game
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setIsLoading(false);
    setIsRevealing(false);
  }, []);

  // Physical keyboard's letter and backspace Inputs ONLY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();

      if (key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        e.preventDefault();
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return {
    gameState,
    isLoading,
    isRevealing,
    handleKeyPress,
    submitCurrentGuess,
    resetGame,
  };
}