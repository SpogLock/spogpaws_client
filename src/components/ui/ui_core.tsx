// Re-export all UI components from a central location

// Import all components
import OutlinedButtonComponent from './outlined-button';
import FilledButtonComponent from './filled-button';
import NavbarComponent from './navbar';
import MaterialDemoComponent from './material-demo';
export * from './loading-spinner';
export * from './error-boundary';
export * from './input';

// Import named exports for the default export object
import { LoadingSpinner } from './loading-spinner';
import { ErrorBoundary } from './error-boundary';
import { Input } from './input';

// Import utility exports
export * from './ui-utility';

// Create a default export object with all components
const UI = {
  OutlinedButton: OutlinedButtonComponent,
  FilledButton: FilledButtonComponent,
  Navbar: NavbarComponent,
  MaterialDemo: MaterialDemoComponent,
  LoadingSpinner,
  ErrorBoundary,
  Input,
};

export default UI;

// Also keep named exports for flexibility
export {
  OutlinedButtonComponent as OutlinedButton,
  NavbarComponent as Navbar,
  MaterialDemoComponent as MaterialDemo,
};