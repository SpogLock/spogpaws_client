# Material Design 3 Setup

This document outlines the Material Design 3 (Material UI) setup in your SpogPaws client application.

## 🎨 What's Included

### Packages Installed
- `@mui/material` - Core Material UI components
- `@mui/icons-material` - Material Design icons
- `@emotion/react` & `@emotion/styled` - CSS-in-JS styling engine
- `@mui/material-nextjs` - Next.js integration for optimal performance

### Theme Configuration
- **File**: `src/lib/theme.ts`
- **Features**:
  - Material Design 3 color palette
  - Modern typography scale
  - Rounded corners and modern shadows
  - Component-specific styling overrides
  - Both light and dark theme variants

### Key Material 3 Features
- **Color System**: Primary, secondary, tertiary, and semantic colors following Material 3 specs
- **Typography**: Complete Material 3 typography scale (Display, Headline, Body, etc.)
- **Shape**: Modern rounded corners (12px default, 20px for buttons)
- **Elevation**: Material 3 shadow system
- **Components**: Pre-styled components following Material 3 design principles

## 🚀 Usage

### Basic Component Usage

```tsx
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  TextField,
  Stack 
} from '@mui/material';

export default function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Pet Care Service
        </Typography>
        <TextField 
          label="Pet Name" 
          variant="outlined" 
          fullWidth 
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained">
            Book Appointment
          </Button>
          <Button variant="outlined">
            Learn More
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

### Using Material Icons

```tsx
import { 
  Add as AddIcon,
  Pets as PetsIcon,
  LocalHospital as ClinicIcon 
} from '@mui/icons-material';

<Button startIcon={<AddIcon />}>
  Add Pet
</Button>
```

### Custom Styling with sx Prop

```tsx
<Typography 
  variant="h4" 
  sx={{ 
    color: 'primary.main',
    fontWeight: 'medium',
    mb: 3 
  }}
>
  Welcome to SpogPaws
</Typography>
```

## 🎯 Material 3 Color System

### Primary Colors
- **Primary**: `#6750A4` (Purple) - Main brand actions
- **Secondary**: `#625B71` (Purple-gray) - Secondary actions
- **Tertiary**: `#7D5260` (Mauve) - Accent colors

### Semantic Colors
- **Error**: `#BA1A1A` (Red)
- **Warning**: `#FFC107` (Amber)
- **Info**: `#2196F3` (Blue)
- **Success**: `#4CAF50` (Green)

### Usage Example
```tsx
<Button color="primary">Primary Action</Button>
<Button color="secondary">Secondary Action</Button>
<Alert severity="success">Operation completed!</Alert>
```

## 📱 Responsive Design

Material UI components are responsive by default. Use the theme breakpoints:

```tsx
<Box sx={{
  width: { xs: '100%', md: '50%' },
  p: { xs: 2, md: 4 }
}}>
  Content adapts to screen size
</Box>
```

### Breakpoints
- `xs`: 0px and up
- `sm`: 600px and up
- `md`: 900px and up
- `lg`: 1200px and up
- `xl`: 1536px and up

## 🌙 Theme Management

### Current Setup
- Light theme is default
- Dark theme available as `material3DarkTheme`
- Theme switching hook available at `src/hooks/use-theme.ts`

### Future Theme Switching
To implement theme switching, you can extend the providers:

```tsx
// In your providers.tsx
const [mode, setMode] = useState<'light' | 'dark'>('light');
const theme = mode === 'light' ? material3Theme : material3DarkTheme;

<ThemeProvider theme={theme}>
  {children}
</ThemeProvider>
```

## 🏗️ Architecture

### Provider Structure
```
AppProviders
  └── MaterialThemeProvider (Material UI setup)
      └── Providers (Auth and other app logic)
          └── AuthProvider
              └── Your App Content
```

### File Structure
```
src/
├── lib/
│   ├── theme.ts          # Material 3 theme configuration
│   └── providers.tsx     # App providers including Material UI
├── hooks/
│   └── use-theme.ts      # Theme management hook
└── components/
    └── ui/
        └── material-demo.tsx  # Component showcase
```

## 📚 Component Examples

Visit `/` to see the Material 3 components in action with the demo page that showcases:
- Buttons (Filled, Outlined, Text, FAB)
- Cards with actions
- Form elements (TextField, Switch)
- Chips and Tags
- Typography scale
- Icons and more

## 🎨 Customization

### Extending the Theme
To add custom colors or modify the theme:

```tsx
// In theme.ts
const customTheme = createTheme({
  ...material3Theme,
  palette: {
    ...material3Theme.palette,
    custom: {
      main: '#FF5722',
    },
  },
});
```

### Component Overrides
Material 3 components are already styled, but you can override:

```tsx
// In theme.ts, components section
MuiButton: {
  styleOverrides: {
    root: {
      // Your custom button styles
    },
  },
},
```

## 🔧 Best Practices

1. **Use the sx prop** for one-off styling instead of custom CSS
2. **Leverage the theme** - use theme colors, spacing, and breakpoints
3. **Consistent spacing** - use theme spacing units (8px base)
4. **Semantic colors** - use appropriate colors for actions (primary, secondary, error, etc.)
5. **Responsive design** - test components across different screen sizes

## 📖 Resources

- [Material UI Documentation](https://mui.com/)
- [Material Design 3 Guidelines](https://m3.material.io/)
- [Material 3 Color System](https://m3.material.io/styles/color/system)
- [Material Icons](https://mui.com/material-ui/material-icons/)

The setup is now complete and ready for development! 🎉 