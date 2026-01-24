import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from './auth.store';
import { BackendError } from './backend-error';
import { useBackendHealth } from './use-backend-health';
import { Button } from '../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/ui/card';
import { Input } from '../../shared/ui/input';

/**
 * Simple dev-only login screen for token input.
 * Includes backend health check to prevent access when backend is down.
 */
export const DevLoginPage = () => {
  const navigate = useNavigate();
  const { token, login, isAuthenticated } = useAuth();
  const { isHealthy, isChecking, error, retry } = useBackendHealth(false);

  const [value, setValue] = useState(() => token ?? 'dev');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Show loading state during initial health check
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md shadow-sm">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Connecting to backend...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error if backend is not healthy
  if (!isHealthy && error) {
    return (
      <BackendError
        error={error}
        onRetry={retry}
        isRetrying={isChecking}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle>Backoffice Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground" htmlFor="dev-token">
              Dev token
            </label>
            <Input
              id="dev-token"
              name="devToken"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Enter dev token"
              autoComplete="off"
            />
          </div>
          <Button
            className="w-full"
            onClick={() => {
              const nextToken = value.trim() || 'dev';
              login(nextToken);
              navigate('/', { replace: true });
            }}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
