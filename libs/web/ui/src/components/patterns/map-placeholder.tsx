import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * MapPlaceholder - Placeholder for map components
 * Visual placeholder with optional loading state and controls
 */

export interface MapPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Placeholder message
   */
  message?: string;
  /**
   * Map controls (zoom, layers, etc.)
   */
  controls?: React.ReactNode;
  /**
   * Height of the placeholder
   */
  height?: string | number;
}

function MapPlaceholder({
  className,
  loading = false,
  message = 'Map view',
  controls,
  height = 400,
  ...props
}: MapPlaceholderProps) {
  return (
    <div
      data-slot="map-placeholder"
      className={cn('relative overflow-hidden rounded-lg border border-border bg-muted', className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      {...props}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* Map icon */}
          <div className="mb-3 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
          </div>

          {/* Message */}
          <div className="text-sm font-medium text-muted-foreground">
            {loading ? 'Loading map...' : message}
          </div>

          {/* Loading spinner */}
          {loading && (
            <div className="mt-3 flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Controls overlay */}
      {controls && <div className="absolute right-3 top-3 flex flex-col gap-2">{controls}</div>}

      {/* Default controls placeholder */}
      {!controls && (
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {/* Zoom in */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card shadow-sm hover:bg-accent"
            title="Zoom in"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Zoom out */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card shadow-sm hover:bg-accent"
            title="Zoom out"
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
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Layers */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card shadow-sm hover:bg-accent"
            title="Layers"
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
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export { MapPlaceholder };
