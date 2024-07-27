import { RefObject, useCallback, useEffect, useState } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  isForcUpdate: boolean = false
) => {
  const [isClickOutside, setIsClickOutside] = useState<boolean>(false);
  const [, updateState] = useState<object>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const element = e.target;
      if (ref.current && element) {
        const contains = ref.current.contains(element as Node);
        setIsClickOutside(!contains);
        if (isForcUpdate) forceUpdate();
      }
    };
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);
  return isClickOutside;
};

export default useClickOutside;
