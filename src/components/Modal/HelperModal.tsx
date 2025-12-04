import clsx from 'clsx';
import { X } from 'lucide-react';

interface HelperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelperModal({ isOpen, onClose }: HelperModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className = 'relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-wordle-surface rounded-2xl shadow-2xl border border-wordle-border p-6 sm:p-8'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-wordle-muted hover:text-wordle-text hover:bg-wordle-border/50 transition-colors"
          aria-label="Close"
        >
          <X className='h-6 w-6'/>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-display font-bold text-wordle-text mb-6">
          How To Play
        </h2>

        {/* Instructions */}
        <div className="space-y-4 text-wordle-text">
          <p>
            Guess the <strong>WORDLE</strong> in 6 tries.
          </p>
          <p>
            Each guess must be a valid 5-letter word. Press enter to submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>

        {/* Examples */}
        <div className="mt-6 pt-6 border-t border-wordle-border">
          <h3 className="font-display font-semibold text-wordle-text mb-4">
            Examples
          </h3>

          {/* Correct Example */}
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {['H', 'E', 'A', 'R', 'T'].map((letter, i) => (
                <div
                  key={i}
                  className={clsx(
                    'w-10 h-10 flex items-center justify-center',
                    'font-display font-bold rounded border-2',
                    i === 0
                      ? 'bg-wordle-correct border-wordle-correct text-white'
                      : 'bg-wordle-surface border-wordle-border text-wordle-text'
                  )}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-wordle-muted">
              <strong className="text-wordle-correct">H</strong> is in the
              word and in the correct spot.
            </p>
          </div>

          {/* Present Example */}
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {['S', 'P', 'I', 'L', 'L'].map((letter, i) => (
                <div
                  key={i}
                  className={clsx(
                    'w-10 h-10 flex items-center justify-center',
                    'font-display font-bold rounded border-2',
                    i === 1
                      ? 'bg-wordle-present border-wordle-present text-wordle-present-text'
                      : 'bg-wordle-surface border-wordle-border text-wordle-text'
                  )}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-wordle-muted">
              <strong className="text-wordle-present">P</strong> is in the
              word but in the wrong spot.
            </p>
          </div>

          {/* Absent Example */}
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {['V', 'A', 'G', 'U', 'E'].map((letter, i) => (
                <div
                  key={i}
                  className={clsx(
                    'w-10 h-10 flex items-center justify-center',
                    'font-display font-bold rounded border-2',
                    i === 3
                      ? 'bg-wordle-absent border-wordle-absent text-white'
                      : 'bg-wordle-surface border-wordle-border text-wordle-text'
                  )}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-wordle-muted">
              <strong className="text-wordle-text">U</strong> is not in the
              word in any spot.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 px-6 rounded-xl
                   bg-wordle-correct hover:bg-wordle-correct/80
                   font-display font-semibold text-white
                   transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}