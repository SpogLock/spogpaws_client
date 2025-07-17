'use client';

import { useAuth } from '@/hooks/use-auth';
import { LoginForm } from '@/components/features/auth/login-form';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/lib/providers';

export default function HomePage() {
  const { 
    isAuthenticated, 
    user, 
    logout, 
    isLoading,
    isVet,
    isPetOwner,
    isShelter,
    isAdmin 
  } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading Spog Paws...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🐾 Spog Paws
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting veterinarians with pet owners for better pet care, 
              facilitating adoptions, and providing quality pet products.
            </p>
          </header>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-lg font-semibold mb-2">Vet Consultations</h3>
              <p className="text-gray-600">
                Connect with certified veterinarians for online and in-person consultations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold mb-2">Pet Adoption</h3>
              <p className="text-gray-600">
                Find your perfect companion through our comprehensive adoption platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold mb-2">Pet Store</h3>
              <p className="text-gray-600">
                Shop for quality pet food, toys, and accessories from trusted brands.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Architecture Demo Info */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-center">
              🏗️ Architecture Demo
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>This page demonstrates:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>UI Layer:</strong> React components (Button, Input, LoginForm)</li>
                <li><strong>Service Layer:</strong> Auth service with Zustand state management</li>
                <li><strong>Repository Layer:</strong> HTTP client ready to connect to Spring Boot backend</li>
                <li><strong>Types Layer:</strong> Full TypeScript support with domain models</li>
                <li><strong>Hooks Layer:</strong> Custom useAuth hook for clean component integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🐾 Spog Paws
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.firstName}</span>
                {isVet() && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">VET</span>}
                {isPetOwner() && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">PET OWNER</span>}
                {isShelter() && <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">SHELTER</span>}
                {isAdmin() && <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">ADMIN</span>}
              </div>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to your Dashboard! 👋
            </h2>
            <p className="text-gray-600 mb-4">
              You're now logged in and the architecture is working perfectly!
            </p>
            
            {/* User Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Your Profile:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {user?.firstName} {user?.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {user?.email}
                </div>
                <div>
                  <strong>Role:</strong> {user?.role}
                </div>
                <div>
                  <strong>Verified:</strong> {user?.isVerified ? '✅ Yes' : '❌ No'}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              🏗️ Clean Architecture in Action
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">State Management</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Zustand store for auth state</li>
                  <li>✅ React Query for server state</li>
                  <li>✅ Persistent auth across sessions</li>
                  <li>✅ Automatic token refresh</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Repository Layer</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ HTTP client with interceptors</li>
                  <li>✅ Repository pattern implementation</li>
                  <li>✅ Error handling & retries</li>
                  <li>✅ Ready for Spring Boot API</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">Type Safety</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Domain models for all entities</li>
                  <li>✅ API DTOs for requests/responses</li>
                  <li>✅ Repository interfaces</li>
                  <li>✅ Full TypeScript coverage</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">SOLID Principles</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Single Responsibility</li>
                  <li>✅ Open/Closed Principle</li>
                  <li>✅ Dependency Inversion</li>
                  <li>✅ Interface Segregation</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🚀 Next Steps:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Connect to your Spring Boot backend by updating the API_BASE_URL</li>
                <li>• Add more repository implementations (Pet, Product, etc.)</li>
                <li>• Create feature-specific pages and components</li>
                <li>• Implement role-based routing and permissions</li>
                <li>• Add comprehensive error boundaries and loading states</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
