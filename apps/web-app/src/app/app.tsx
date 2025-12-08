import { RequireAuth } from '@klastack-nx/web/auth';
import { AppShell, SidebarNav, Topbar } from '@klastack-nx/web/ui';
import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth';
import {
  LoginPage,
  LiveOpsPage,
  AlertsPage,
  IncidentsPage,
  AssetsPage,
  ZonesPage,
  AnalyticsPage,
  IntegrationsPage,
  AdminPage,
} from '../pages';

interface RootRedirectProps {
  isAuthenticated: boolean;
}

/**
 * Root redirect: check auth and redirect appropriately.
 *
 * Defined at module scope to avoid creating a new component type during render.
 */
function RootRedirect({ isAuthenticated }: RootRedirectProps) {
  return isAuthenticated ? <Navigate to="/live-ops" replace /> : <Navigate to="/login" replace />;
}

/**
 * Main Application Component
 * Handles routing and layout with AppShell
 */
export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearToken, user, isAuthenticated, isLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Check if we're on the login page
  const isLoginPage = location.pathname === '/login';

  // Get user initials from email
  const getUserInitials = (email: string) => {
    const name = email.split('@')[0];
    return name
      .split(/[._-]/)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest('[data-user-menu]')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
              V
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Navigation configuration
  const navGroups = [
    {
      label: 'Operations',
      items: [
        {
          label: 'Live Ops',
          href: '/live-ops',
          isActive: location.pathname === '/live-ops',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          ),
        },
        {
          label: 'Alerts',
          href: '/alerts',
          isActive: location.pathname === '/alerts',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ),
        },
        {
          label: 'Incidents',
          href: '/incidents',
          isActive: location.pathname === '/incidents',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ),
        },
      ],
    },
    {
      label: 'Infrastructure',
      items: [
        {
          label: 'Assets',
          href: '/assets',
          isActive: location.pathname === '/assets',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          ),
        },
        {
          label: 'Zones',
          href: '/zones',
          isActive: location.pathname === '/zones',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          ),
        },
      ],
    },
    {
      label: 'Insights',
      items: [
        {
          label: 'Analytics',
          href: '/analytics',
          isActive: location.pathname === '/analytics',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          ),
        },
      ],
    },
    {
      label: 'Configuration',
      items: [
        {
          label: 'Integrations',
          href: '/integrations',
          isActive: location.pathname === '/integrations',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          ),
        },
        {
          label: 'Admin',
          href: '/admin',
          isActive: location.pathname === '/admin',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
        },
      ],
    },
  ];

  const handleNavigate = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    clearToken();
    navigate('/login');
  };

  // If on login page, render without AppShell
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  // If not authenticated and not on login page, don't render AppShell
  // (will be redirected by ProtectedRoute)
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<RootRedirect isAuthenticated={isAuthenticated} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // For authenticated users, render with AppShell and protection
  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform border-r border-border bg-card transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarNav
          groups={navGroups}
          onNavigate={handleNavigate}
          collapsed={false}
          header={
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  V
                </div>
                <div>
                  <div className="font-bold">Klastack-nx</div>
                  <div className="text-xs text-muted-foreground">Security Platform</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                title="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          }
          footer={
            <div className="px-2 text-xs text-muted-foreground">© 2026 Klastack-nx Security</div>
          }
        />
      </aside>

      <AppShell
        sidebarCollapsed={sidebarCollapsed}
        sidebar={
          <SidebarNav
            groups={navGroups}
            onNavigate={handleNavigate}
            collapsed={sidebarCollapsed}
            header={
              <div className="flex items-center gap-3 min-h-[32px]">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  V
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                  }`}
                >
                  <div className="whitespace-nowrap">
                    <div className="font-bold">Klastack-nx</div>
                    <div className="text-xs text-muted-foreground">Security Platform</div>
                  </div>
                </div>
              </div>
            }
            footer={
              !sidebarCollapsed && (
                <div className="px-2 text-xs text-muted-foreground">
                  © 2026 Klastack-nx Security
                </div>
              )
            }
          />
        }
        topbar={
          <Topbar
            left={
              <>
                {/* Mobile menu button - visible on mobile/tablet only */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent lg:hidden"
                  title="Toggle menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>

                {/* Mobile logo - visible on mobile/tablet only */}
                <div className="flex items-center gap-2 lg:hidden">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    V
                  </div>
                  <span className="font-bold text-sm">Klastack-nx</span>
                </div>

                {/* Desktop sidebar toggle - visible on desktop only */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                  title="Toggle sidebar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </>
            }
            showSearch={true}
            showTime={true}
            showTheme={true}
            showUser={false}
            right={
              <div className="flex items-center gap-1 sm:gap-2">
                {/* User menu dropdown */}
                {user && (
                  <div className="relative" data-user-menu>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                      title={user.email}
                    >
                      {getUserInitials(user.email)}
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 top-12 z-50 w-56 sm:w-64 rounded-md border border-border bg-card shadow-lg">
                        {/* User info header */}
                        <div className="flex items-center gap-3 border-b border-border p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {getUserInitials(user.email)}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium">{user.email.split('@')[0]}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="p-1">
                          <button
                            onClick={() => setUserMenuOpen(false)}
                            className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            Account
                          </button>
                          <button
                            onClick={() => setUserMenuOpen(false)}
                            className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                            </svg>
                            Notifications
                          </button>
                        </div>

                        {/* Logout separator */}
                        <div className="border-t border-border p-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            }
          />
        }
      >
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<RootRedirect isAuthenticated={isAuthenticated} />} />

          {/* Protected routes */}
          <Route
            path="/live-ops"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <LiveOpsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/alerts"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <AlertsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/incidents"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <IncidentsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/assets"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <AssetsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/zones"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <ZonesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/analytics"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <AnalyticsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/integrations"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <IntegrationsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <AdminPage />
              </RequireAuth>
            }
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="mt-2 text-muted-foreground">Page not found</p>
                  </div>
                </div>
              </RequireAuth>
            }
          />
        </Routes>
      </AppShell>
    </>
  );
}

export default App;
