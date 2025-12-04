# 🎯 Wordle Clone

My take on the viral word game that took over everyone's morning routine. Built this as a deep-dive into React patterns, state management, and accessible design.

## Why I Built This

Wordle is deceptively simple — type a word, get feedback, repeat. But under the hood, there's a lot going on: keyboard handling, animation sequencing, state synchronization between the board and keyboard, accessibility considerations... I wanted to tackle all of it from scratch.

## 🎮 Try It Out
```bash
npm install
npm run dev
```

That's it. Open `http://localhost:5173` and start guessing!

## What's Under the Hood

### Tech Choices

| Tech | Why I Chose It |
|------|----------------|
| **React 19** | Latest features, great DX |
| **TypeScript** | Caught so many bugs before runtime |
| **Tailwind CSS** | Rapid styling without context-switching |
| **Vite** | Instant HMR, fast builds |

### Architecture Decisions

**Custom Hook for Game Logic (`useWordle`)**

I extracted all game logic into a single hook. This keeps `App.tsx` clean and makes the logic testable in isolation. The hook manages:
- Board state (6 rows × 5 tiles)
- Current position tracking
- Guess validation and scoring
- Keyboard state synchronization
- Win/lose detection

**API Integration**

The app validates guesses against an external Wordle API. Each guess is sent as a POST request, and the API returns whether it's a valid word plus the score for each letter position.

**Accessibility First**

I'm proud of this one. All color combinations meet **WCAG 2.1 AA** standards (4.5:1+ contrast). The yellow tiles use dark text instead of white — a small change that makes a big difference for colorblind users.

## Challenges I Faced

### 1. Animation Timing

The tile flip animation needs to happen sequentially (tile 1, then 2, then 3...) but the keyboard colors should only update *after* all tiles finish. Getting this timing right required careful use of `setTimeout` chains and state flags.

### 2. Keyboard State Sync

When you guess "APPLE" and the first P is yellow but the second P is gray, what color should the P key be? Answer: the *best* state wins (green > yellow > gray). This required a priority system when updating the keyboard state map.

### 3. The Virtual Keyboard Bug

My virtual keyboard wasn't responding at all. Spent way too long on this before realizing I'd nested the key handler inside an unrelated `if` block. Classic. 🤦

## Project Structure
```
src/
├── components/
│   ├── Board/        → The 6×5 grid
│   ├── Keyboard/     → Virtual keyboard
│   ├── Header/       → App title
│   └── Modal/        → Win/lose + help screens
├── hooks/
│   └── useWordle.ts  → All the game brain
├── services/
│   └── api.ts        → API validation
├── types/            → TypeScript definitions
└── utils/            → Constants + helpers
```

## What I'd Add With More Time

- **Offline Fallback** — Local word validation when API is unavailable
- **Hard Mode** — Must use revealed hints in subsequent guesses
- **Statistics** — Track win rate, streak, guess distribution
- **Share Results** — Copy that emoji grid to clipboard
- **Dark/Light Theme** — Currently dark only

## Run the Scripts
```bash
npm run dev 
```

## Built With

React • TypeScript • Tailwind CSS • Vite • react-hot-toast • lucide-react

---

Thanks for checking this out! If you have questions about any implementation details.