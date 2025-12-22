import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  whiteSpace: 'nowrap',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s, opacity 0.2s',
};

const variantStyles: Record<string, CSSProperties> = {
  default: {
    backgroundColor: '#171717',
    color: '#fafafa',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#171717',
    border: '1px solid #e5e5e5',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#171717',
  },
};

const sizeStyles: Record<string, CSSProperties> = {
  default: {
    height: '40px',
    padding: '8px 16px',
  },
  sm: {
    height: '32px',
    padding: '4px 12px',
    fontSize: '13px',
  },
  lg: {
    height: '48px',
    padding: '12px 24px',
    fontSize: '16px',
  },
};

const hoverColors: Record<string, string> = {
  default: '#171717e6',
  outline: '#f5f5f5',
  ghost: '#f5f5f5',
};

function Button({
  children,
  variant = 'default',
  size = 'default',
  style,
  disabled,
  ...props
}: ButtonProps) {
  const combinedStyle: CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
    ...style,
  };

  return (
    <button
      style={combinedStyle}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = hoverColors[variant];
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor =
            variantStyles[variant].backgroundColor || 'transparent';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
export type { ButtonProps };
