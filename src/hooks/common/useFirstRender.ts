import { useEffect, useRef } from "react";

export const useFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
    console.log('useFirstRender');
    console.log(isFirstRender);
  }, [])

  return isFirstRender.current;
}
