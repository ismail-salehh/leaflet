import { useEffect, useState } from "react";

// A custom hook is just a function whose name starts with "use"
// and that calls other hooks. <T> makes it "generic": it works for
// any type, and TypeScript figures T out from initialValue.
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Passing a FUNCTION to useState = "lazy initial state":
  // it only runs once, on the first render, not on every render.
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue; // storage blocked or corrupted JSON: start fresh
    }
  });

  // useEffect runs AFTER render. The array [key, value] is the dependency list:
  // React re-runs this effect only when one of those changes.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked (private mode): the app still works, just won't persist
    }
  }, [key, value]);

  // "as const" makes this a fixed [T, setter] tuple instead of a loose array.
  return [value, setValue] as const;
}
