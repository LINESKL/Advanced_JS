import React from 'react';
import ThemeContext from '../context/ThemeContext.jsx';

export function withTheme(WrappedComponent) {
  function WithTheme(props) {
    return (
      <ThemeContext.Consumer>
        {(themeContext) => {
          if (themeContext === undefined) {
            throw new Error('withTheme must be used within a ThemeProvider');
          }
          const { theme, isDark, toggleTheme } = themeContext;
          return (
            <WrappedComponent
              {...props}
              theme={theme}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  // Установка displayName для удобства отладки в React DevTools
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithTheme.displayName = `WithTheme(${displayName})`;

  return WithTheme;
}

export default withTheme;