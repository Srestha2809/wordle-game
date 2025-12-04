// API endpoint
export const API_ENDPOINT = 'https://wordle-apis.vercel.app/api/validate';

// Word Length and Max Guesses
export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

//KeyBoard Layout
export const KEYBOARD_LETTERS_LAYOUT = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

// Scores Mapping
export const WORDLE_SCORE = {
  0: 'absent',
  1: 'present',
  2: 'correct'
}

//Animations:
export const FLIP_TILE = 300; // ms per tile
export const SHAKE_TILES = 500; // ms
export const REVEAL_WORD = 1800;

// Messages to show:
// Messages
export const WIN_MESSAGES = [
  'Genius!',
  'Magnificent!',
  'Impressive!',
  'Splendid!',
  'Great!',
  'Phew!',
];

export const LOSE_MESSAGE = 'Better luck next time!';