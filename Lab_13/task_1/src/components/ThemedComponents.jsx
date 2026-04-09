import React from 'react';
import { withTheme } from '../hocs/withTheme.jsx';

// ThemedButton
function ThemedButtonBase({ theme, children, variant = 'primary', ...props }) {
  const baseStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.md,
  };

  const variantStyles = {
    primary: { backgroundColor: theme.colors.primary, color: '#ffffff' },
    secondary: { backgroundColor: theme.colors.secondary, color: '#ffffff' },
  };

  return (
    <button style={{ ...baseStyles, ...variantStyles[variant] }} {...props}>
      {children}
    </button>
  );
}
export const ThemedButton = withTheme(ThemedButtonBase);

// ThemedCard
function ThemedCardBase({ theme, children, elevated = false, ...props }) {
  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: elevated
      ? (theme.name === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)')
      : 'none'
  };

  return <div style={cardStyle} {...props}>{children}</div>;
}
export const ThemedCard = withTheme(ThemedCardBase);