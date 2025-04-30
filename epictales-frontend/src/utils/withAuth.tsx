import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
//import LoadingSpinner from '@/components/LoadingSpinner'; // Create this component

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Show loading spinner while checking authentication
    if (isLoading) {
      return <LoadingSpinner />;
    }

    // Only render the protected component if authenticated
    return isAuthenticated ? <Component {...props} /> : null;
  };
}

const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;