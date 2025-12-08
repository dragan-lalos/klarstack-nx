import {
  PageHeader,
  FilterBar,
  DSSelect,
  DSButton,
  DSTable,
  DSTableHeader,
  DSTableBody,
  DSTableRow,
  DSTableHead,
  DSTableCell,
  DSBadge,
  DSDialog,
  DSDialogHeader,
  DSDialogTitle,
  DSDialogDescription,
  DSDialogContent,
} from '@klastack-nx/web-ui';
import * as React from 'react';

import { mockAlerts } from '../../fixtures/mock-data';

import type { Alert } from '../../types';

/**
 * AlertsPage - Alert management and investigation
 *
 * Features:
 * - FilterBar (severity/status/type)
 * - Alerts table
 * - Alert details dialog
 */

export const AlertsPage = () => {
  const [selectedAlert, setSelectedAlert] = React.useState<Alert | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts"
        description="Manage and investigate security alerts"
        actions={<DSButton>Create Manual Alert</DSButton>}
      />

      {/* Filters */}
      <FilterBar
        filters={
          <>
            <DSSelect
              label="Severity"
              options={[
                { value: 'all', label: 'All Severities' },
                { value: 'critical', label: 'Critical' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
              defaultValue="all"
            />
            <DSSelect
              label="Status"
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'acknowledged', label: 'Acknowledged' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'dismissed', label: 'Dismissed' },
              ]}
              defaultValue="all"
            />
            <DSSelect
              label="Type"
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'intrusion', label: 'Intrusion' },
                { value: 'loitering', label: 'Loitering' },
                { value: 'access_violation', label: 'Access Violation' },
                { value: 'perimeter_breach', label: 'Perimeter Breach' },
              ]}
              defaultValue="all"
            />
          </>
        }
        actions={
          <>
            <DSButton variant="outline" size="sm">
              Export
            </DSButton>
            <DSButton variant="outline" size="sm">
              Refresh
            </DSButton>
          </>
        }
      />

      {/* Alerts Table */}
      <DSTable>
        <DSTableHeader>
          <DSTableRow>
            <DSTableHead>Time</DSTableHead>
            <DSTableHead>Type</DSTableHead>
            <DSTableHead>Severity</DSTableHead>
            <DSTableHead>Score</DSTableHead>
            <DSTableHead>Status</DSTableHead>
            <DSTableHead>Zone</DSTableHead>
            <DSTableHead>Asset</DSTableHead>
            <DSTableHead>Actions</DSTableHead>
          </DSTableRow>
        </DSTableHeader>
        <DSTableBody>
          {mockAlerts.map((alert) => (
            <DSTableRow key={alert.id}>
              <DSTableCell className="text-sm">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </DSTableCell>
              <DSTableCell className="text-sm">{alert.type}</DSTableCell>
              <DSTableCell>
                <DSBadge
                  variant={
                    alert.severity === 'critical' || alert.severity === 'high'
                      ? 'destructive'
                      : 'default'
                  }
                >
                  {alert.severity}
                </DSBadge>
              </DSTableCell>
              <DSTableCell className="text-sm">{(alert.score * 100).toFixed(0)}%</DSTableCell>
              <DSTableCell>
                <DSBadge variant="outline">{alert.status}</DSBadge>
              </DSTableCell>
              <DSTableCell className="text-sm">{alert.zoneName}</DSTableCell>
              <DSTableCell className="text-sm">{alert.assetName || '—'}</DSTableCell>
              <DSTableCell>
                <DSButton size="sm" variant="ghost" onClick={() => handleViewAlert(alert)}>
                  View
                </DSButton>
              </DSTableCell>
            </DSTableRow>
          ))}
        </DSTableBody>
      </DSTable>

      {/* Alert Details Dialog */}
      <DSDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DSDialogContent>
          {selectedAlert && (
            <>
              <DSDialogHeader>
                <DSDialogTitle>{selectedAlert.title}</DSDialogTitle>
                <DSDialogDescription>{selectedAlert.description}</DSDialogDescription>
              </DSDialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Severity:</span>{' '}
                    {selectedAlert.severity}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span> {selectedAlert.status}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Score:</span>{' '}
                    {(selectedAlert.score * 100).toFixed(0)}%
                  </div>
                  <div>
                    <span className="text-muted-foreground">Zone:</span> {selectedAlert.zoneName}
                  </div>
                </div>
                <div className="flex gap-2">
                  <DSButton variant="outline" onClick={() => setDialogOpen(false)}>
                    Close
                  </DSButton>
                  <DSButton>Acknowledge</DSButton>
                  <DSButton variant="destructive">Dismiss</DSButton>
                </div>
              </div>
            </>
          )}
        </DSDialogContent>
      </DSDialog>
    </div>
  );
};
