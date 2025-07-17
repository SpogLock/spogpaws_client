# 🐾 Spog Paws - Enterprise Pet Care Platform

A comprehensive Next.js platform connecting veterinarians with pet owners, facilitating pet adoptions, and providing quality pet care products. Built with **clean architecture** following **SOLID principles** for enterprise-level scalability.

## 🏗️ Architecture Overview

This project implements a **layered architecture** that ensures separation of concerns, maintainability, and testability:

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer (React)                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────┐   │
│  │    Components   │ │      Pages      │ │  Hooks   │   │
│  └─────────────────┘ └─────────────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                Service Layer (Business Logic)           │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────┐   │
│  │ State Management│ │ Business Rules  │ │Validation│   │
│  │   (Zustand)     │ │                 │ │          │   │
│  └─────────────────┘ └─────────────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│              Repository Layer (Data Access)             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────┐   │
│  │  HTTP Client    │ │  Repositories   │ │  Cache   │   │
│  │   (Axios)       │ │                 │ │(R.Query) │   │
│  └─────────────────┘ └─────────────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                Types & Models Layer                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────┐   │
│  │ Domain Models   │ │    API DTOs     │ │Interfaces│   │
│  │   (Entities)    │ │                 │ │          │   │
│  └─────────────────┘ └─────────────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Spring Boot backend API

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd spogpaws_client
npm install
```

2. **Set up environment variables:**
```bash
# Create .env.local file
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3
NEXT_PUBLIC_API_RETRY_DELAY=1000
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
```
http://localhost:3000
```

The application will show a demo with the architecture working. The login form demonstrates the complete flow from UI → Service → Repository layers.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (architecture demo)
│   └── globals.css        # Global styles
├── components/            # UI Components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx    # Button component
│   │   └── input.tsx     # Input component
│   └── features/         # Feature-specific components
│       └── auth/         # Authentication components
│           └── login-form.tsx
├── hooks/                # Custom React hooks
│   └── use-auth.ts      # Authentication hook
├── lib/                  # Shared libraries
│   ├── api-config.ts    # API configuration
│   ├── http-client.ts   # HTTP client implementation
│   └── providers.tsx    # Global providers
├── repositories/         # Data access layer
│   ├── base.repository.ts      # Base repository class
│   ├── auth.repository.ts      # Authentication repository
│   ├── vet.repository.ts       # Veterinarian repository
│   └── index.ts               # Repository factory
├── services/             # Business logic layer
│   └── auth.service.ts   # Authentication service
└── types/               # TypeScript type definitions
    ├── domain.ts        # Domain models
    ├── api.ts          # API DTOs
    ├── interfaces.ts   # Repository interfaces
    └── index.ts        # Type exports
```

## 🎯 Core Features

### 🏠 Pet Adoption
- **Listings**: Comprehensive pet profiles with photos and details
- **Applications**: Structured adoption application process
- **Matching**: Smart matching based on lifestyle and preferences
- **Tracking**: Application status tracking and communication

### 🛒 Pet Store
- **Products**: Food, toys, accessories, and health products
- **Categories**: Organized by pet type and product category
- **Reviews**: Customer reviews and ratings
- **Orders**: Complete order management and tracking

## 🏗️ Architecture Deep Dive

### 🎨 UI Layer

**Location**: `src/components/`, `src/app/`

**Responsibilities**:
- Presentation logic only
- User interaction handling
- Component composition
- Styling and layout

**Key Files**:
- `components/ui/`: Reusable UI components (Button, Input, etc.)
- `components/features/`: Feature-specific components
- `app/`: Next.js pages and layouts

**Example Usage**:
```tsx
// Clean component that uses hooks for business logic
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function UserProfile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
```

### 🔄 Service Layer

**Location**: `src/services/`, `src/hooks/`

**Responsibilities**:
- Business logic implementation
- State management (Zustand)
- Data transformation
- Validation rules
- Coordination between UI and repositories

**Key Files**:
- `services/auth.service.ts`: Authentication business logic
- `hooks/use-auth.ts`: React hook for auth state

**Example Usage**:
```tsx
// Service handles business logic and state management
export const useAuthStore = create<AuthState>()({
  login: async (credentials) => {
    // Validation
    const errors = await authService.validateLoginForm(credentials);
    if (errors.length > 0) throw new Error(errors.join(', '));
    
    // Repository call
    const response = await authRepo.login(credentials);
    
    // State update
    set({ user: response.data.user, isAuthenticated: true });
  }
});
```

### 🗄️ Repository Layer

**Location**: `src/repositories/`

**Responsibilities**:
- Data access abstraction
- HTTP client management
- API communication
- Error handling and retries
- Caching (via React Query)

**Key Files**:
- `repositories/base.repository.ts`: Base CRUD operations
- `repositories/auth.repository.ts`: Authentication API calls
- `lib/http-client.ts`: HTTP client with interceptors

**Example Usage**:
```tsx
// Repository handles all API communication
export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.httpClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Handle token storage
    if (response.success) {
      this.storeTokens(response.data.accessToken, response.data.refreshToken);
    }
    
    return response;
  }
}
```

### 📝 Types Layer

**Location**: `src/types/`

**Responsibilities**:
- Type safety across all layers
- Domain model definitions
- API contract definitions
- Interface contracts for repositories

**Key Files**:
- `types/domain.ts`: Business domain models (User, Pet, Vet, etc.)
- `types/api.ts`: API request/response DTOs
- `types/interfaces.ts`: Repository interfaces following SOLID principles

**Example Domain Model**:
```tsx
// Strong typing for business entities
export interface Pet extends BaseEntity {
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  medicalHistory: MedicalRecord[];
  isForAdoption: boolean;
}

export enum PetSpecies {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  // ...
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3
NEXT_PUBLIC_API_RETRY_DELAY=1000

# File Upload
NEXT_PUBLIC_UPLOAD_MAX_SIZE=10485760  # 10MB
NEXT_PUBLIC_SUPPORTED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf
```

### API Endpoints

The application is configured to work with a Spring Boot backend. Update the `API_BASE_URL` to point to your backend server.

**Expected Endpoints**:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token
- `GET /vets` - Get veterinarians
- `GET /pets` - Get pets
- `GET /products` - Get products
- And more... (see `src/lib/api-config.ts` for complete list)

## 🛠️ Development Guide

### Adding a New Feature

1. **Define Types** (Types Layer):
```tsx
// src/types/domain.ts
export interface Appointment extends BaseEntity {
  vetId: string;
  petOwnerId: string;
  petId: string;
  scheduledDate: Date;
  status: AppointmentStatus;
}
```

2. **Create Repository** (Repository Layer):
```tsx
// src/repositories/appointment.repository.ts
export class AppointmentRepository extends BaseRepository<...> {
  async findByVet(vetId: string): Promise<ApiResponse<Appointment[]>> {
    return this.get(`${this.baseEndpoint}/vet/${vetId}`);
  }
}
```

3. **Create Service** (Service Layer):
```tsx
// src/services/appointment.service.ts
export const useAppointmentStore = create<AppointmentState>()({
  appointments: [],
  loading: false,
  
  fetchByVet: async (vetId: string) => {
    set({ loading: true });
    const repo = repositoryFactory.getAppointmentRepository();
    const result = await repo.findByVet(vetId);
    set({ appointments: result.data, loading: false });
  }
});
```

4. **Create Hook** (Service Layer):
```tsx
// src/hooks/use-appointments.ts
export const useAppointments = () => {
  const { appointments, loading, fetchByVet } = useAppointmentStore();
  
  return {
    appointments,
    loading,
    fetchByVet,
    // ... other computed values and actions
  };
};
```

5. **Create Components** (UI Layer):
```tsx
// src/components/features/appointments/appointment-list.tsx
export function AppointmentList({ vetId }: { vetId: string }) {
  const { appointments, loading, fetchByVet } = useAppointments();
  
  useEffect(() => {
    fetchByVet(vetId);
  }, [vetId]);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      {appointments.map(appointment => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
```

### Testing Strategy

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test layer interactions
3. **E2E Tests**: Test complete user flows

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

## 🌐 API Integration

### Connecting to Spring Boot Backend

1. **Update environment variables**:
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/v1
```

2. **Verify API endpoints match** the ones defined in `src/lib/api-config.ts`

3. **Test connection**:
```bash
# The app will show connection status on the dashboard
npm run dev
```

### Authentication Flow

The app handles JWT tokens automatically:

1. **Login**: Stores access & refresh tokens
2. **API Calls**: Automatically adds Authorization header
3. **Token Refresh**: Automatic refresh when tokens expire
4. **Logout**: Clears all stored data

### Error Handling

The HTTP client includes comprehensive error handling:

- **Network errors**: Automatic retries
- **401 Unauthorized**: Automatic token refresh
- **400-499**: Client error handling
- **500+**: Server error handling with retries

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Automatic Token Refresh**: Seamless session management
- **Role-Based Access**: Different permissions for Vets, Pet Owners, etc.
- **Input Validation**: Client-side and server-side validation
- **Error Boundaries**: Graceful error handling
- **XSS Protection**: Sanitized inputs and outputs

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS:

- **Mobile**: Optimized for phone screens
- **Tablet**: Medium screen adaptations
- **Desktop**: Full desktop experience
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

For production, ensure these environment variables are set:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.spogpaws.com/v1
NODE_ENV=production
```

### Deployment Platforms

This app can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers
- **Traditional hosting** with Node.js support

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the architecture patterns** described in this README
4. **Write tests** for new functionality
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Standards

- **Follow SOLID principles**
- **Maintain layer separation**
- **Write TypeScript for everything**
- **Add tests for new features**
- **Update documentation**
- **Use conventional commits**

## 📖 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Zustand State Management**: https://github.com/pmndrs/zustand
- **React Query**: https://tanstack.com/query
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**:
   - Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
   - Verify backend server is running
   - Check network connectivity

2. **Authentication Not Working**:
   - Clear browser localStorage
   - Check token expiration
   - Verify API endpoints

3. **Build Errors**:
   - Run `npm run type-check` for TypeScript errors
   - Check for missing dependencies
   - Verify environment variables

### Getting Help

- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Documentation**: Check this README
- **Code Examples**: See the demo implementation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

**Built with ❤️ for the pet care community**

The architecture is designed to be **scalable**, **maintainable**, and **enterprise-ready**. Each layer has a clear responsibility, making the codebase easy to understand, test, and extend.

Happy coding! 🐾
