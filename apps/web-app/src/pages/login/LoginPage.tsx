/**
 * Login Page
 * Displays authentication form for user login
 */
import { useLogin } from '@klastack-nx/web/auth';
import {
  DSCard,
  DSCardHeader,
  DSCardTitle,
  DSCardDescription,
  DSCardContent,
  DSCardFooter,
  DSInput,
  DSButton,
} from '@klastack-nx/web-ui';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../auth';

/**
 * LoginPage Component
 * Handles user authentication with email/password
 */
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setToken } = useAuth();
  const loginMutation = useLogin({ setToken });

  const [email, setEmail] = useState('admin@local');
  const [password, setPassword] = useState('P@ssw@rd1243');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: Location })?.from?.pathname || '/live-ops';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <DSCard>
          <DSCardHeader className="space-y-3 block">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                V
              </div>
            </div>
            <div className="text-center">
              <DSCardTitle className="text-2xl block">Sign in</DSCardTitle>
            </div>
            <div className="text-center">
              <DSCardDescription className="block">
                Enter your credentials to access Klastack-nx Security Platform
              </DSCardDescription>
            </div>
          </DSCardHeader>

          <form onSubmit={handleSubmit}>
            <DSCardContent className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <DSInput
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loginMutation.isPending}
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <DSInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loginMutation.isPending}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Error Message */}
              {loginMutation.isError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {loginMutation.error.message || 'Invalid email or password'}
                </div>
              )}
            </DSCardContent>

            <DSCardFooter>
              <DSButton
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending || !email || !password}
              >
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
              </DSButton>
            </DSCardFooter>
          </form>
        </DSCard>
      </div>
    </div>
  );
}
