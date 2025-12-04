export type TileState = 'empty' | 'absent' | 'present' | 'correct' | 'deciding';
export type GameStatus = 'playing' | 'won' | 'lost';
export type TileRole = 'key' | 'tile';

export interface BoardRowData{
    tiles: TileData[];
    isSubmitted: boolean;
    isInvalid: boolean;
};

export interface TileData{
    letter: string;
    state: TileState;
}

export interface ValidateResponse{
    isvalidword: boolean;
    score: number[];
}

export interface GameState{
    board: BoardRowData[];
    currentRow: number;
    currentTile: number;
    gameStatus: GameStatus;
    letterStates: Map<string, TileState>;
}

