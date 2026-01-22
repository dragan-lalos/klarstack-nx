import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from './auth.store';
import { Button } from '../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/ui/card';
import { Input } from '../../shared/ui/input';

/**
 * Simple dev-only login screen for token input.
 */
export const DevLoginPage = () => {
  const navigate = useNavigate();
  const { token, login, isAuthenticated } = useAuth();

  const [value, setValue] = useState(() => token ?? 'dev');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
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
