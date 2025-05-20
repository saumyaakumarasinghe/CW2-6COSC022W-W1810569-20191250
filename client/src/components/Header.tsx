import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const LOGO_IMAGE =
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=100&h=100&fit=crop&q=60';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.userName;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Navigation Bar */}
      <nav>
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src={LOGO_IMAGE}
                  alt="Passport Pages Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-gray-900">Passport Pages</span>
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => router.push(`/profile`)}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-50 px-3 py-1.5 rounded-md"
                  >
                    Welcome,{' '}
                    <span className="font-medium text-blue-500">{getUserDisplayName()}</span>
                  </button>
                  <Button
                    variant="outline"
                    className="hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => router.push('/')}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
