'use client';

import React from 'react';
import { useTheme } from './theme_provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  );
}
