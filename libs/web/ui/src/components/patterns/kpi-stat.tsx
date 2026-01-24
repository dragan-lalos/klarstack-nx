import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * KPIStat - Key Performance Indicator display
 * Shows a statistic with label, value, trend, and optional comparison
 */

type KPITrend = 'up' | 'down' | 'neutral';

const TREND_COLORS: Record<KPITrend, string> = {
  up: 'text-success',
  down: 'text-destructive',
  neutral: 'text-muted-foreground',
};

function TrendIcon({ trend }: { trend: KPITrend }): React.JSX.Element | null {
  if (trend === 'up') {
    return (
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
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }

  if (trend === 'down') {
    return (
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
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    );
  }

  return null;
}

export interface KPIStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stat label/title
   */
  label: string;
  /**
   * Primary value to display
   */
  value: string | number;
  /**
   * Optional change indicator (e.g., "+12.5%")
   */
  change?: string;
  /**
   * Trend direction
   */
  trend?: KPITrend;
  /**
   * Additional description or context
   */
  description?: string;
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
  /**
   * Display variant
   */
  variant?: 'default' | 'compact';
}

function KPIStat({
  className,
  label,
  value,
  change,
  trend = 'neutral',
  description,
  icon,
  variant = 'default',
  ...props
}: KPIStatProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      data-slot="kpi-stat"
      className={cn('rounded-lg border border-border bg-card p-4', isCompact && 'p-3', className)}
      {...props}
    >
      {/* Header with label and icon */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>

      {/* Value */}
      <div className={cn('mt-2 text-3xl font-bold tracking-tight', isCompact && 'text-2xl')}>
        {value}
      </div>

      {/* Change and trend */}
      {change && (
        <div
          className={cn('mt-1 flex items-center gap-1 text-sm font-medium', TREND_COLORS[trend])}
        >
          <TrendIcon trend={trend} />
          <span>{change}</span>
        </div>
      )}

      {/* Description */}
      {description && <div className="mt-2 text-xs text-muted-foreground">{description}</div>}
    </div>
  );
}

export { KPIStat };
