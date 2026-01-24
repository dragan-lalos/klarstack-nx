import { useEffect, useState } from 'react';

interface HealthCheckResult {
  isHealthy: boolean;
  isChecking: boolean;
  error: string | null;
  lastChecked: Date | null;
  retry: () => void;
}

const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
const INITIAL_CHECK_TIMEOUT = 5000; // 5 seconds for initial check

/**
 * Hook to check backend health status.
 * Performs an initial check and optionally polls at intervals.
 * 
 * Uses a simple fetch to test backend connectivity.
 * 
 * @param enablePolling - Whether to continuously poll the health endpoint
 * @returns Health check status with retry function
 */
export function useBackendHealth(enablePolling = false): HealthCheckResult {
  const [state, setState] = useState<Omit<HealthCheckResult, 'retry'>>({
    isHealthy: false,
    isChecking: true,
    error: null,
    lastChecked: null,
  });
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const checkHealth = async () => {
      if (!mounted) return;

      setState((prev) => ({ ...prev, isChecking: true, error: null }));

      try {
        const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), INITIAL_CHECK_TIMEOUT);

        // Simple connectivity check - just try to reach the API
        // We don't care about the response, just that we can connect
        await fetch(baseUrl, {
          method: 'HEAD',
          signal: controller.signal,
          // Don't send credentials on health check
          credentials: 'omit',
        });

        clearTimeout(timeout);

        // Accept any response (including 404) as long as we got a response
        // This means the backend is reachable
        if (mounted) {
          setState({
            isHealthy: true,
            isChecking: false,
            error: null,
            lastChecked: new Date(),
          });
        }
      } catch (error) {
        if (mounted) {
          let errorMessage = 'Backend is not available';

          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              errorMessage = 'Connection timeout - backend is not responding';
            } else if (error.message.includes('Failed to fetch')) {
              errorMessage = 'Cannot reach backend - is the server running?';
            } else {
              errorMessage = error.message;
            }
          }

          setState({
            isHealthy: false,
            isChecking: false,
            error: errorMessage,
            lastChecked: new Date(),
          });
        }
      }
    };

    // Initial check
    checkHealth();

    // Set up polling if enabled
    if (enablePolling) {
      intervalId = setInterval(checkHealth, HEALTH_CHECK_INTERVAL);
    }

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [enablePolling, retryTrigger]); // Re-run when retryTrigger changes

  const retry = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  return { ...state, retry };
}
