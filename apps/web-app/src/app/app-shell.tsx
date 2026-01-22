import { LayoutDashboard, Settings, Users } from 'lucide-react';
import { memo, useMemo, type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '../features/auth/auth.store';
import { useMe } from '../features/me/me.query';
import { WorkspaceSwitcher } from '../features/workspaces/workspace-switcher';
import { isApiError } from '../shared/api/api.types';
import { EmptyState } from '../shared/patterns';
import { Button } from '../shared/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const AppShellComponent = () => {
  const { logout } = useAuth();
  const { user, isLoading, error } = useMe();

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-4 w-4" /> },
      { label: 'Members', href: '/members', icon: <Users className="h-4 w-4" /> },
      { label: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> },
    ],
    [],
  );

  const accessDenied = isApiError(error) && error.status === 403;

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 md:flex">
          <div className="mb-8">
            <div className="text-xs font-medium uppercase text-muted-foreground">Backoffice</div>
            <div className="text-lg font-semibold text-foreground">Admin Console</div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
                end={item.href === '/'}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-muted-foreground">Workspace</div>
              <WorkspaceSwitcher compact />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <div className="font-medium text-foreground">
                  {user?.displayName || user?.email || 'Loading user'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isLoading ? 'Fetching profile...' : 'Signed in'}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Log out
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6">
            {accessDenied ? (
              <EmptyState
                title="Access denied for this workspace"
                description="Select another workspace to continue."
                action={<WorkspaceSwitcher />}
              />
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

/**
 * Memoized shell layout to reduce re-renders.
 */
export const AppShell = memo(AppShellComponent);
