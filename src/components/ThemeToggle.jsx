import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IonIcon } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import '../asset/css/theme-toggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      <IonIcon 
        icon={isDark ? sunny : moon} 
        className="theme-toggle-icon"
      />
    </button>
  );
};

export default ThemeToggle;
