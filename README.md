# Spogpaws Client

A Next.js client application for the Spogpaws veterinary platform, featuring user management, clinic administration, and pet adoption services.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd spogpaws_client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API configuration

# Start development server
npm run dev
```


## 📋 Project Overview

This application provides a modern, responsive web interface for the Spogpaws platform, built with Next.js 14 and TypeScript. The architecture has been carefully designed to align with the documented Spogpaws API structure, focusing on three core modules:

- **👥 User Management** - Authentication, user profiles, and account management
- **🏥 Clinic Management** - Veterinary clinic registration and administration  
- **🐕 Pet Adoption** - Pet adoption listings and management

## 🏗️ Architecture Overview

### Clean Layered Architecture

```
src/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page with navigation
│   └── globals.css        # TailwindCSS global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx    # Styled button component
│   │   └── input.tsx     # Form input component
│   └── features/         # Feature-specific components
│       ├── auth/         # Authentication components
│       │   └── login-form.tsx
│       ├── clinic/       # Clinic management
│       │   └── clinic-list.tsx
│       └── adoption/     # Pet adoption
│           └── adoption-list.tsx
├── services/             # Business logic with Zustand stores
│   ├── auth.service.ts   # Authentication & user state
│   ├── clinic.service.ts # Clinic operations & state
│   └── adoption.service.ts # Adoption management & state
├── repositories/         # Data access layer
│   ├── auth.repository.ts    # User API calls
│   ├── clinic.repository.ts  # Clinic API calls
│   ├── adoption.repository.ts # Adoption API calls
│   └── base.repository.ts    # Shared repository utilities
├── lib/                  # Core utilities
│   ├── api-config.ts     # API endpoints configuration
│   ├── http-client.ts    # Axios HTTP client setup
│   └── providers.tsx     # React Query & context providers
├── types/                # TypeScript definitions
│   ├── api.ts           # API request/response types
│   ├── domain.ts        # Business domain types
│   └── interfaces.ts    # Service contracts
└── hooks/               # Custom React hooks
    └── use-auth.ts      # Authentication hook
```

## 🔌 API Integration

### Endpoint Configuration

The application integrates with three main API modules:

#### 👥 User Management (`/api/v1/user/`)
```typescript
// Available endpoints
POST   /user/signup           # User registration
POST   /user/login            # User authentication  
GET    /user/                 # Get all users
POST   /user/update/{userId}  # Update user profile
DELETE /user/delete/{userId}  # Delete user account
PUT    /user/reset-password/{userId} # Reset password
```

#### 🏥 Clinic Management (`/api/v1/clinic/`)
```typescript
// Available endpoints
POST /clinic/create-clinic              # Register new clinic
GET  /clinic/get-clinics               # List all clinics
GET  /clinic/get-clinic-by-id/{id}     # Get clinic details
PUT  /clinic/update-clinic/{id}        # Update clinic info
POST /clinic/approval/{id}             # Request clinic approval
```

#### 🐕 Pet Adoption (`/api/v1/adoption/`)
```typescript
// Available endpoints
GET    /adoption/get-adoptions         # List all pets
GET    /adoption/get-adoption/{id}     # Get pet details
POST   /adoption/create-adoption       # Add new pet
PUT    /adoption/update-adoption/{id}  # Update pet info
DELETE /adoption/delete-adoption/{id}  # Remove pet listing
```

### API Response Format

All endpoints return a consistent response structure:

```typescript
interface ApiResponse<T> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data?: T;
}

// Example successful response
{
  "status": "success",
  "statusCode": 200,
  "message": "User authenticated successfully",
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## 🔐 Authentication System

### JWT Token-Based Authentication

```typescript
// Login example
import { useAuth } from '@/hooks/use-auth';

function LoginPage() {
  const { login, user, isLoading, error } = useAuth();
  
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      // User is automatically redirected after successful login
    } catch (error) {
      // Error handling is managed by the hook
    }
  };
}
```

### Authentication Features

- ✅ JWT token storage and management
- ✅ Automatic token restoration on page reload
- ✅ Protected API calls with automatic token inclusion
- ✅ User session persistence
- ✅ Secure logout with token cleanup

## 📊 State Management

### Zustand Stores

Each feature module has its own Zustand store for optimal performance:

#### Auth Store
```typescript
import { useAuthStore } from '@/services/auth.service';

const { 
  user,           // Current user data
  isAuthenticated, // Authentication status
  login,          // Login function
  logout,         // Logout function
  updateProfile   // Profile update function
} = useAuthStore();
```

#### Clinic Store
```typescript
import { useClinicStore } from '@/services/clinic.service';

const {
  clinics,        // Clinic listings
  selectedClinic, // Currently selected clinic
  isLoading,      // Loading state
  error,          // Error state
  getAllClinics,  // Fetch all clinics
  createClinic,   // Create new clinic
  updateClinic    // Update existing clinic
} = useClinicStore();
```

#### Adoption Store
```typescript
import { useAdoptionStore } from '@/services/adoption.service';

const {
  adoptions,      // Pet listings
  selectedPet,    // Currently selected pet
  isLoading,      // Loading state
  getAllAdoptions, // Fetch all pets
  createAdoption, // Add new pet
  updateAdoption  // Update pet info
} = useAdoptionStore();
```

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd spogpaws_client

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Configuration

Create `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://your-server-ip/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000

# Optional: Development settings
NODE_ENV=development
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 💻 Usage Examples

### Complete Authentication Flow

```typescript
// pages/login.tsx
import { LoginForm } from '@/components/features/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onSuccess={() => router.push('/dashboard')} />
    </div>
  );
}
```

### Clinic Management

```typescript
// pages/clinics.tsx
import { ClinicList } from '@/components/features/clinic/clinic-list';

export default function ClinicsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Veterinary Clinics</h1>
      <ClinicList />
    </div>
  );
}
```

### Pet Adoption

```typescript
// pages/adoptions.tsx
import { AdoptionList } from '@/components/features/adoption/adoption-list';

export default function AdoptionsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Pet Adoption</h1>
      <AdoptionList />
    </div>
  );
}
```

## 🎨 UI Components

### Pre-built Components

#### Form Components
- **Button** - Styled button with loading states and variants
- **Input** - Form input with validation support

#### Feature Components
- **LoginForm** - Complete authentication form with validation
- **ClinicList** - Clinic listings with CRUD operations
- **AdoptionList** - Pet adoption listings with filtering

### Styling

- **TailwindCSS** for utility-first styling
- **Responsive Design** with mobile-first approach
- **Consistent Design System** across all components

## 📱 Features

### ✅ Implemented Features

- 🔐 **User Authentication** - Login, signup, profile management
- 🏥 **Clinic Management** - Create, view, edit veterinary clinics
- 🐕 **Pet Adoption** - Manage pet adoption listings
- 📱 **Responsive Design** - Mobile-friendly interface
- 🛡️ **Type Safety** - Full TypeScript coverage
- ⚡ **Performance** - Optimized with Next.js 14
- 🎯 **State Management** - Efficient Zustand stores
- 🔄 **Error Handling** - Comprehensive error management
- 🎨 **Modern UI** - Clean, professional design

### 🚧 Planned Enhancements

- 📊 **Dashboard Analytics** - Clinic and adoption statistics
- 📧 **Email Notifications** - Automated communication
- 🔍 **Advanced Search** - Filter pets by criteria
- 📋 **Application Management** - Adoption application tracking
- 💬 **Messaging System** - Communication between users

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test            # Unit tests
npm run test:e2e    # End-to-end tests
npm run test:watch  # Watch mode
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm i -g vercel
vercel

# Set environment variables in Vercel dashboard
```

### Manual Deployment

```bash
# Build application
npm run build

# Start production server
npm start
```

## 📚 Additional Resources

### Project Structure Explanation

- **Repositories** - Handle all API communication with proper error handling
- **Services** - Manage business logic and state with Zustand
- **Components** - Reusable UI components with TypeScript props
- **Hooks** - Custom React hooks for common functionality
- **Types** - Comprehensive TypeScript definitions

### Development Guidelines

1. **Follow TypeScript** - Use proper types for all functions and components
2. **Error Handling** - Always handle loading and error states
3. **Validation** - Validate user inputs on both client and server side
4. **Responsive Design** - Ensure mobile compatibility
5. **Performance** - Optimize API calls and component renders

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow code standards** - Use existing patterns and TypeScript
4. **Add proper error handling** and loading states
5. **Test thoroughly** with actual API endpoints
6. **Commit changes** (`git commit -m 'Add amazing feature'`)
7. **Push to branch** (`git push origin feature/amazing-feature`)
8. **Open Pull Request**

## 📝 Notes

- **Simplified Architecture** - Streamlined from complex veterinary platform to focused API integration
- **API Alignment** - Structure exactly matches documented Spogpaws API
- **Modern Stack** - Built with Next.js 14, TypeScript, TailwindCSS, and Zustand
- **Production Ready** - Includes error handling, validation, and responsive design

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Review existing documentation
- Check API documentation alignment

---

Built with ❤️ using Next.js 14, TypeScript, and TailwindCSS
