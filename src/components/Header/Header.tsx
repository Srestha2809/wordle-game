import { CircleQuestionMarkIcon } from "lucide-react";

interface HeaderProps{
    handleHelpClick: () => void;
}

export function Header ({handleHelpClick} : HeaderProps){
    return(
        <header className="w-full border-b border-wordle-border">
      <div className="max-w-lg mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-wordle-text">
          WORDLE
        </h1>

        <button
          onClick={handleHelpClick}
          className="p-2 rounded-lg hover:bg-wordle-surface transition-colors
                   text-wordle-muted hover:text-wordle-text"
          aria-label="How to play"
        >
          <CircleQuestionMarkIcon className="h-8 w-8"/>
        </button>
      </div>
    </header>
    )
}