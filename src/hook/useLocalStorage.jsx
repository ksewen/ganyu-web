import { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState();

  const setValue = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const resetValue = () => {
    setValue(null);
    setStoredValue(null);
  };

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      try {
        const parsed = JSON.parse(value);
        setStoredValue(parsed);
      } catch (error) {
        console.log(error);
        setStoredValue(initialValue);
      }
    } else {
      setStoredValue(initialValue);
    }
  }, []);

  useEffect(() => {
    if (storedValue) {
      setValue(storedValue);
    }
  }, [storedValue]);

  return [storedValue, setStoredValue, resetValue];
};
