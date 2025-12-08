import { PageHeader, KPIStat, MapPlaceholder, Panel, DSBadge, DSButton } from '@klastack-nx/web-ui';
import * as React from 'react';

import { mockAlerts, mockEvidenceEvents } from '../../fixtures/mock-data';

import type { Alert } from '../../types';

/**
 * LiveOpsPage - Real-time operations dashboard
 *
 * Features:
 * - KPI row (Active Alerts, Incidents Today, Data Health)
 * - Map visualization
 * - Live alert feed
 * - Evidence panel for selected alert
 */

export const LiveOpsPage = () => {
  const [selectedAlert, setSelectedAlert] = React.useState<Alert | null>(null);

  // Get active alerts
  const activeAlerts = mockAlerts.filter((a) => a.status === 'active');

  // Get evidence for selected alert
  const selectedEvidence = selectedAlert
    ? mockEvidenceEvents.filter((e) => e.alertId === selectedAlert.id)
    : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Operations"
        description="Real-time security monitoring and response"
        actions={
          <>
            <DSButton>Create Incident</DSButton>
            <DSButton variant="outline">Export Data</DSButton>
          </>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KPIStat label="Active Alerts" value={activeAlerts.length} change="+3" trend="up" />
        <KPIStat label="Incidents Today" value={2} change="-1" trend="down" />
        <KPIStat label="Data Health" value="98.5%" change="+0.2%" trend="up" />
      </div>

      {/* Map */}
      <MapPlaceholder height="400px" />

      {/* Alert Feed & Evidence Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Alert Feed */}
        <Panel
          title="Live Alert Feed"
          headerActions={
            <DSButton variant="ghost" size="sm">
              Refresh
            </DSButton>
          }
        >
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {mockAlerts.slice(0, 8).map((alert) => (
              <div
                key={alert.id}
                className="cursor-pointer rounded-lg border border-border p-3 hover:bg-accent transition-colors"
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <DSBadge
                        variant={
                          alert.severity === 'critical' || alert.severity === 'high'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {alert.severity}
                      </DSBadge>
                      <span className="text-sm font-medium">{alert.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {alert.zoneName} • {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <DSBadge variant="outline">{alert.status}</DSBadge>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Evidence Panel */}
        <Panel title="Evidence & Signals">
          {selectedAlert ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Selected Alert</h4>
                <p className="text-sm">{selectedAlert.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Score: {(selectedAlert.score * 100).toFixed(0)}% • {selectedAlert.zoneName}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">WHY this Alert?</h4>
                <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">
                  Evidence Timeline ({selectedEvidence.length})
                </h4>
                <div className="space-y-2">
                  {selectedEvidence.length > 0 ? (
                    selectedEvidence.map((ev) => (
                      <div key={ev.id} className="text-sm border-l-2 border-primary pl-3">
                        <div className="font-medium">{ev.type}</div>
                        <div className="text-xs text-muted-foreground">
                          {ev.description} • {ev.confidence * 100}% confidence
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No evidence events recorded for this alert.
                    </p>
                  )}
                </div>
              </div>

              <DSButton className="w-full" variant="outline">
                View Full Evidence
              </DSButton>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Select an alert to view evidence and signals
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
};
