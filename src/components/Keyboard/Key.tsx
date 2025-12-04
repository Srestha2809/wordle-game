import { useCallback } from "react";
import type { TileState } from "../../types";
import { DeleteIcon } from "lucide-react";
import { clsx } from "clsx";
import { getTileClasses } from "../../utils";

interface KeyProps {
    keyValue: string;
    state: TileState;
    onClick: (key: string) => void;
    isWide?: boolean;
  }

  export function Key({ keyValue, state, onClick, isWide = false }: KeyProps) {
    const handleClick = useCallback(() => {
      onClick(keyValue);
    }, [keyValue, onClick]);
  
    const displayValue =
      keyValue === 'BACKSPACE' ? (
        <DeleteIcon className="h-8 w-8"/>
      ) : (
        keyValue
      );
  
    return (
      <button
        type="button"
        onClick={handleClick}
        className={clsx(
            getTileClasses(state, 'key'),
          isWide
            ? 'px-3 sm:px-4 text-xs sm:text-sm min-w-[58px] sm:min-w-[66px]'
            : 'w-8 sm:w-11 text-sm sm:text-base',
          'h-12 sm:h-14',
        )}
      >
        {displayValue}
      </button>
    );
  }