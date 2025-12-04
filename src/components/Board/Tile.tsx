import type { TileState } from "../../types";
import clsx from "clsx";
import { getTileClasses } from "../../utils";

interface TileProps{
    letter: string;
    state: TileState;
    position: number;
    isRevealing?: boolean;
}

  export function Tile({letter, state, position, isRevealing = false}: TileProps){
    const revealFlip = isRevealing && state !== 'empty' && state !== 'deciding';

    return(
        <div
        className={clsx(
            getTileClasses(state, 'tile'),
            revealFlip && 'animate-flip'
          )}
          style={{
            animationDelay: revealFlip ? `${position * 300}ms` : '0ms',
          }}>{letter}
            
        </div>
    )
}
