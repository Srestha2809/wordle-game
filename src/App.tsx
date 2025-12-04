import { useCallback, useEffect, useState } from "react";
import { useWordle } from "./hooks/useWordle"
import { WORD_LENGTH } from "./utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { Board } from "./components/Board/Board";
import { Header } from "./components/Header/Header";
import { Keyboard } from "./components/Keyboard/KeyBoard";
import { ResultModal } from "./components/Modal/ResultModal";
import { HelperModal } from "./components/Modal/HelperModal";


function App() {
  const { gameState,
    isLoading,
    isRevealing,
    handleKeyPress,
    submitCurrentGuess,
    resetGame,
  } = useWordle();

  const [displayResultModal, setDisplayResultModal] = useState(false);
  const [displayHelperModal, setDisplayHelperModal] = useState(false);

  const handleToast = useCallback(async (key: string) => {
    if (key === 'ENTER') {
      if (gameState.currentTile < WORD_LENGTH) {
        toast.error('Not enough letters');
        return;
      }
      const validResult = await submitCurrentGuess();
      if (!validResult.success && validResult.message) {
        toast.error(validResult.message);
      }
    } else {
      handleKeyPress(key);
    }
  }, [gameState.currentTile, handleKeyPress, submitCurrentGuess]);

  // Physical keyboard Enter handler
  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        handleToast('ENTER');
      }
    };

    window.addEventListener('keydown', handleEnterKey);
    return () => window.removeEventListener('keydown', handleEnterKey);
  }, [handleToast]);

  // Show game modal when game ends
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') {
      // Delay to allow final animation to complete
      const timer = setTimeout(() => {
        setDisplayResultModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus]);

  // Show help modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('wordle-visited');
    if (!hasVisited) {
      setDisplayHelperModal(true);
      localStorage.setItem('wordle-visited', 'true');
    }
  }, []);

  const handlePlayAgain = () => {
    setDisplayResultModal(false);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-wordle-bg bg-grid-pattern flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <Header handleHelpClick={() => setDisplayHelperModal(true)}/>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-4">
      <Board
          board={gameState.board}
          currentRow={gameState.currentRow}
          isRevealing={isRevealing}
        />

        <Keyboard letterStates={gameState.letterStates}
        onKeyPress={handleToast}
        disabled={isLoading || isRevealing || gameState.gameStatus !== 'playing'}/>

      </div>

      <footer className="py-3 text-center text-wordle-muted text-sm font-display">
        <p>
          MPAC Take Home Assignment
        </p>
      </footer>

      <ResultModal isOpen={displayResultModal} gameStatus={gameState.gameStatus} guessCount={gameState.currentRow} onPlayAgain={handlePlayAgain}/>

      <HelperModal isOpen={displayHelperModal} onClose={() => setDisplayHelperModal(false)}/>
    </div>
  )
}

export default App
