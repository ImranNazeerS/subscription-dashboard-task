import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore';
import Button from './Button';
import { LogOut, User, LayoutDashboard, CreditCard, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-button-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">S</span>
          </div>
          SaaS Dashboard
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-text-secondary hover:text-text-primary">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {isAuthenticated ? (
            <>
              <Link to="/plans" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                Plans
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/subscriptions" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  Admin
                </Link>
              )}

              <div className="h-6 w-px bg-border mx-2" />

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <div className="w-8 h-8 rounded-full bg-surfaceSecondary border border-border flex items-center justify-center">
                    <User className="w-4 h-4 text-text-secondary" />
                  </div>
                  <span className="hidden sm:inline-block">{user?.name || user?.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-text-secondary hover:text-danger">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
