import { useRef } from "react";

type Fn = (...args: any[]) => any;
const useDebounce = (callback: Fn, delay: number = 500) => {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  return function (...args: any[]) {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounce;
