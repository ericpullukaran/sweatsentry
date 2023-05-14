import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

const useInterval = (
  callback: CallbackFunction,
  delay: number | null,
): React.RefObject<number | null> => {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef<CallbackFunction>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [delay]);

  return intervalRef;
};

export default useInterval;
