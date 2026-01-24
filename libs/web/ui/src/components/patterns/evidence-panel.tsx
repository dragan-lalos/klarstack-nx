import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * EvidencePanel - Analysis evidence display
 * Shows WHY (reasoning) and supporting signals/evidence
 */

export interface Signal {
  /**
   * Signal label
   */
  label: string;
  /**
   * Signal value or status
   */
  value: string;
  /**
   * Signal strength or confidence level
   */
  strength?: 'high' | 'medium' | 'low';
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
}

export interface EvidencePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Main reasoning or explanation (WHY)
   */
  reasoning: string;
  /**
   * Supporting signals/evidence
   */
  signals?: Signal[];
  /**
   * Panel title
   */
  title?: string;
  /**
   * Display variant
   */
  variant?: 'default' | 'compact';
}

function EvidencePanel({
  className,
  reasoning,
  signals = [],
  title = 'Evidence',
  variant = 'default',
  ...props
}: EvidencePanelProps) {
  const isCompact = variant === 'compact';

  const strengthColors = {
    high: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    low: 'bg-destructive/10 text-destructive',
  };

  return (
    <div
      data-slot="evidence-panel"
      className={cn(
        'rounded-lg border border-border bg-card',
        isCompact ? 'p-3' : 'p-4',
        className,
      )}
      {...props}
    >
      {/* Title */}
      <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>

      {/* WHY section */}
      <div className="mb-4">
        <div className="mb-2 text-xs font-medium text-muted-foreground">WHY</div>
        <p className="text-sm leading-relaxed text-foreground">{reasoning}</p>
      </div>

      {/* Signals section */}
      {signals.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-medium text-muted-foreground">SIGNALS</div>
          <div className="space-y-2">
            {signals.map((signal, index) => (
              <div key={index} className="flex items-start gap-2 rounded-md bg-muted/50 p-2">
                {/* Icon */}
                {signal.icon && (
                  <div className="mt-0.5 flex-shrink-0 text-muted-foreground">{signal.icon}</div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{signal.label}</span>
                    {signal.strength && (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          strengthColors[signal.strength],
                        )}
                      >
                        {signal.strength}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{signal.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder when no signals */}
      {signals.length === 0 && (
        <div className="rounded-md border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
          No signals available
        </div>
      )}
    </div>
  );
}

export { EvidencePanel };
