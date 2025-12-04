import clsx from "clsx";
import type { GameStatus } from "../../types";
import { LOSE_MESSAGE, WIN_MESSAGES } from "../../utils/constants";
import { CrownIcon, SkullIcon } from "lucide-react";

interface ResultModalProps {
    isOpen: boolean;
    gameStatus: GameStatus;
    guessCount: number;
    onPlayAgain: () => void;
  }
  
  export function ResultModal({ isOpen, gameStatus, guessCount, onPlayAgain }: ResultModalProps) {
    if (!isOpen) return null;
  
    const isWinner = gameStatus === 'won';
    const message = isWinner ? WIN_MESSAGES[guessCount - 1] || WIN_MESSAGES[5] : LOSE_MESSAGE;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onPlayAgain}
        />
  
        {/* Modal Content */}
        <div
          className={clsx(
            'relative z-10 w-full max-w-sm',
            'bg-wordle-surface rounded-2xl shadow-2xl',
            'border border-wordle-border',
            'p-6 sm:p-8'
          )}
        >
          {/* Icon */}
          <div
            className={clsx(
              'w-20 h-20 mx-auto mb-6 rounded-full',
              'flex items-center justify-center',
              isWinner
                ? 'bg-wordle-correct'
                : 'bg-wordle-present'
            )}
          >
            {isWinner ? (
              <CrownIcon className="h-6 w-6"/>
            ) : (
              <SkullIcon className="h-6 w-6"/>
            )}
          </div>
  
          {/* Title */}
          <h2
            className={clsx(
              'text-2xl sm:text-3xl font-display font-bold text-center mb-2',
              isWinner ? 'text-wordle-correct' : 'text-wordle-present'
            )}
          >
            {isWinner ? 'You Won!' : 'Game Over'}
          </h2>
  
          {/* Message */}
          <p className="text-wordle-text text-center text-lg mb-2">
            {message}
          </p>
  
          {/* Guess Count */}
          {isWinner && (
            <p className="text-wordle-muted text-center text-sm mb-6">
              Solved in {guessCount} {guessCount === 1 ? 'guess' : 'guesses'}
            </p>
          )}
  
          {/* Play Again Button */}
          <button
            onClick={onPlayAgain}
            className={clsx(
              'w-full py-3 px-6 rounded-xl',
              'font-display font-semibold text-lg',
              'transition-colors duration-200',
              isWinner
                ? 'bg-wordle-correct hover:bg-wordle-correct/80 text-white'
                : 'bg-wordle-present hover:bg-wordle-present/80 text-wordle-present-text'
            )}
          >
            Play Again
          </button>
        </div>
      </div>
    );
}