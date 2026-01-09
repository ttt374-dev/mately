import { useRef } from "react";

interface UseLongPressOptions {
    threshold?: number;        // 長押し時間(ms)
    onLongPress: () => void;   // 長押し成立時
}

export function useLongPress({ threshold = 500, onLongPress }: UseLongPressOptions) {
    const timerRef = useRef<number | null>(null);
    const longPressedRef = useRef(false);

    const onPressStart = () => {
        longPressedRef.current = false;

        timerRef.current = window.setTimeout(() => {
            longPressedRef.current = true;
            onLongPress();
        }, threshold);
    };

    const onPressEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
     const clear = () => {
          if (timerRef.current) {
              clearTimeout(timerRef.current)
              timerRef.current = null
          }
      }

    return {
        bind: {
            onMouseDown: onPressStart,
            //onMouseUp: onPressEnd,
            //onMouseLeave: onPressEnd,
            onTouchStart: onPressStart,
            //onTouchEnd: onPressEnd,

            onMouseUp: clear,
            onMouseLeave: clear,

            //onTouchStart: onPressStart,
            onTouchEnd: clear,
            onTouchMove: clear, // ← これ重要

      onPointerMove: clear, // pointer 対応環境
    
        },
        isLongPressedRef: longPressedRef,
    };
}
