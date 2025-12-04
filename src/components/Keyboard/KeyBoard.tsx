import { useMemo } from "react";
import type { TileState } from "../../types";
import { KEYBOARD_LETTERS_LAYOUT } from "../../utils/constants";
import { Key } from "./Key";

interface KeyboardProps {
    letterStates: Map<string, TileState>;
    onKeyPress: (key: string) => void;
    disabled?: boolean;
  }
  
  export function Keyboard({ letterStates, onKeyPress, disabled = false }: KeyboardProps) {
    const getKeyState = useMemo(() => {
      return (key: string): TileState => {
        if (key === 'ENTER' || key === 'BACKSPACE') return 'empty';
        return letterStates.get(key) || 'empty';
      };
    }, [letterStates]);
  
    const handleKeyClick = (key: string) => {
      if (!disabled) {
        onKeyPress(key);
      }
    };
  
    return (
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-4">
        {KEYBOARD_LETTERS_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 sm:gap-1.5 justify-center">
            {row.map((key) => (
              <Key
                key={key}
                keyValue={key}
                state={getKeyState(key)}
                onClick={handleKeyClick}
                isWide={key === 'ENTER' || key === 'BACKSPACE'}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }