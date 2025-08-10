'use client';

import { createTheme } from '@mui/material/styles';

// Extend MUI theme interfaces to include custom palette properties
declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      main: string;
      variant: string;
    };
    onSurface: {
      main: string;
      variant: string;
    };
    outline: {
      main: string;
      variant: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      main: string;
      variant: string;
    };
    onSurface?: {
      main: string;
      variant: string;
    };
    outline?: {
      main: string;
      variant: string;
    };
  }
}

// Material Design 3 Color Palette
const material3Colors = {
  primary: {
    main: '#6750A4',
    light: '#7F6DB8',
    dark: '#5A3A91',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#625B71',
    light: '#807A8B',
    dark: '#4A4458',
    contrastText: '#FFFFFF',
  },
  tertiary: {
    main: '#7D5260',
    light: '#996B7A',
    dark: '#633B48',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#BA1A1A',
    light: '#C73E3E',
    dark: '#8C0000',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFC107',
    light: '#FFCD38',
    dark: '#FF8F00',
    contrastText: '#000000',
  },
  info: {
    main: '#2196F3',
    light: '#42A5F5',
    dark: '#1565C0',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    light: '#66BB6A',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
};

// Create Material 3 theme
export const material3Theme = createTheme({
  palette: {
    mode: 'light',
    ...material3Colors,
    background: {
      default: '#FFFBFE',
      paper: '#FFFBFE',
    },
    surface: {
      main: '#FFFBFE',
      variant: '#F7F2FA',
    },
    onSurface: {
      main: '#1D1B20',
      variant: '#49454F',
    },
    outline: {
      main: '#79747E',
      variant: '#CAC4D0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Material 3 Typography Scale
    h1: {
      fontSize: '3.5rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12, // Material 3 uses more rounded corners
  },
  components: {
    // Material 3 Button styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
      },
    },
    // Material 3 Card styling
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(121, 116, 126, 0.12)',
        },
      },
    },
    // Material 3 Paper styling
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
        elevation2: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    // Material 3 TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    // Material 3 Chip styling
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Dark theme variant
export const material3DarkTheme = createTheme({
  ...material3Theme,
  palette: {
    mode: 'dark',
    ...material3Colors,
    primary: {
      main: '#D0BCFF',
      light: '#EADDFF',
      dark: '#4F378B',
      contrastText: '#371E73',
    },
    secondary: {
      main: '#CCC2DC',
      light: '#E8DEF8',
      dark: '#4A4458',
      contrastText: '#332D41',
    },
    background: {
      default: '#1C1B1F',
      paper: '#1C1B1F',
    },
    surface: {
      main: '#1C1B1F',
      variant: '#49454F',
    },
    onSurface: {
      main: '#E6E0E9',
      variant: '#CAC4D0',
    },
    outline: {
      main: '#938F99',
      variant: '#49454F',
    },
  },
});

export default material3Theme; 