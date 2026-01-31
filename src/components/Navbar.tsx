import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X, Home, MapPin, Plus, AlertTriangle, Globe, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Find Stations', icon: MapPin },
    { path: '/home-chargers', label: 'Emergency Charging', icon: AlertTriangle },
    { path: '/all-stations', label: 'All Stations in India', icon: Globe },
    { path: '/rent-your-charger', label: 'Rent Your Charger', icon: Plus },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-md">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              EV<span className="text-gradient">Charge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    size="sm"
                    className={`gap-2 ${
                      link.path === '/home-chargers' && !isActive(link.path)
                        ? 'text-emergency hover:text-emergency'
                        : ''
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="animate-fade-in border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive(link.path) ? 'default' : 'ghost'}
                      className={`w-full justify-start gap-3 ${
                        link.path === '/home-chargers' && !isActive(link.path)
                          ? 'text-emergency hover:text-emergency'
                          : ''
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
              {user ? (
                <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button variant="default" className="w-full justify-start gap-3">
                      <User className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
