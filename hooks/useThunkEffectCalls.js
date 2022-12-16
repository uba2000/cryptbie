import { useRef, useEffect } from 'react';

const useThunkEffectCalls = (callback) => {
  const effectRun = useRef(false);

  useEffect(() => {
    if (!effectRun.current) {
      callback();

      return () => {
        effectRun.current = true;
      };
    }
  }, []);
  return {};
};

export default useThunkEffectCalls;
