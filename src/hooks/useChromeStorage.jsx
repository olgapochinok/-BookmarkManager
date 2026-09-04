import { useState, useEffect } from 'react';

export function useChromeStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  // 1. Загрузка данных из хранилища при монтировании
  useEffect(() => {
    chrome.storage.local.get({ [key]: initialValue }).then((result) => {
      setValue(result[key]);
      setLoading(false);
    });

    // 2. Подписка на изменения (если хранилище обновится извне)
    const handleStorageChange = (changes, areaName) => {
      if (areaName === 'local' && changes[key]) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, [key, initialValue]);

  // 3. Функция обновления данных
  const setStorageValue = async (newValue) => {
    // Поддержка функционального обновления: setStorageValue(prev => ...)
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    await chrome.storage.local.set({ [key]: valueToStore });
  };

  return [value, setStorageValue, loading];
}
