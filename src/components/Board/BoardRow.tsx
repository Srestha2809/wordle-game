import type { BoardRowData } from "../../types";
import { Tile } from "./Tile";
import clsx from "clsx";

interface BoardRowProps {
    rowData: BoardRowData;
    rowIndex: number;
    isCurrentRow: boolean;
    isRevealing: boolean;
}

export function BoardRow({rowData, rowIndex, isCurrentRow, isRevealing} : BoardRowProps){

const {tiles, isInvalid} = rowData;

    return(
        <div className={clsx(
            'flex gap-1.5 sm:gap-2',
            isInvalid && 'animate-shake'
          )}>
            {tiles.map((tile, idx) => (
                <Tile
                key={`${rowIndex} - ${idx}`}
                letter={tile.letter}
                state={tile.state}
                position={idx}
                isRevealing={isRevealing && isCurrentRow}
                />
            ))}
        </div>
    )
};
