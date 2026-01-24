import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '../../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/ui/card';

interface BackendErrorProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

/**
 * Error component displayed when backend is unavailable.
 */
export function BackendError({ error, onRetry, isRetrying = false }: BackendErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-destructive/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <CardTitle className="text-destructive">Backend Connection Error</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-foreground">
              Unable to connect to the backend service. Please ensure:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
              <li>The backend server is running</li>
              <li>The API URL is configured correctly</li>
              <li>There are no network connectivity issues</li>
            </ul>
          </div>

          {error && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-mono text-muted-foreground">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={onRetry}
              disabled={isRetrying}
              variant="default"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Connection
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              If the problem persists, contact your system administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
