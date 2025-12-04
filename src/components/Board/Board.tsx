import type { BoardRowData } from "../../types";
import { BoardRow } from "./BoardRow";

interface BoardProps{
    board: BoardRowData[];
    currentRow: number;
    isRevealing: boolean;
}

export function Board({board, currentRow, isRevealing}: BoardProps) {
    return(
        <div className="flex flex-col gap-1.5 sm:gap-2 p-4">
            {board.map((rowData, idx) => (
                <BoardRow
                key={idx}
                rowData={rowData}
                rowIndex={idx}
                isCurrentRow={idx === currentRow}
                isRevealing={isRevealing}
                />
            ))}
        </div>
    )
};