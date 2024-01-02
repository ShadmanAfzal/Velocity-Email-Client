import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    const isDark = checked ? 'dark' : 'light';
    localStorage.setItem('theme', isDark);
    setDarkMode(checked);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    let isDarkMode = localStorage.getItem('theme') === 'dark';

    setDarkMode(isDarkMode);

    if (isDarkMode) {
      root.classList = ['dark'];
    } else {
      root.classList = ['light'];
    }
  }, [darkMode]);

  return (
    <DarkModeSwitch
      checked={darkMode}
      onChange={toggleDarkMode}
      color={darkMode ? 'white' : 'black'}
      sunColor="yellow"
      moonColor="white"
      size={18}
    />
  );
};
