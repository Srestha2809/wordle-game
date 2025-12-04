
import clsx from 'clsx';
import type { TileRole, TileState } from '../types';

const baseByRole: Record<TileRole, string> = {
  tile: 'w-14 h-14 sm:w-16 sm:h-16 border-2 rounded-lg flex items-center justify-center font-display font-bold text-2xl sm:text-3xl uppercase transition-colors duration-300',
  key: 'flex items-center justify-center rounded-lg font-display font-semibold transition-colors duration-150 active:scale-95',
};

const tileStateStyles = {
  empty: {
    tile: 'border-wordle-border bg-transparent text-wordle-text',
    key: 'bg-wordle-key-bg hover:bg-wordle-muted text-white',
  },
  deciding: {
    tile: 'border-wordle-muted bg-transparent text-wordle-text',
    key: 'bg-wordle-key-bg hover:bg-wordle-muted text-white',
  },
  absent: {
    tile: 'border-wordle-absent bg-wordle-absent text-white',
    key: 'bg-wordle-absent hover:bg-wordle-absent/80 text-white',
  },
  present: {
    tile: 'border-wordle-present bg-wordle-present text-wordle-present-text',
    key: 'bg-wordle-present hover:bg-wordle-present/80 text-wordle-present-text',
  },
  correct: {
    tile: 'border-wordle-correct bg-wordle-correct text-white',
    key: 'bg-wordle-correct hover:bg-wordle-correct/80 text-white',
  },
} satisfies Record<TileState, Record<TileRole, string>>;

export function getTileClasses(
  state: TileState,
  role: TileRole = 'tile',
  extra?: string,
): string {
  return clsx(baseByRole[role], tileStateStyles[state][role], extra);
}
