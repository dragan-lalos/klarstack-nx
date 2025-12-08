import {
  PageHeader,
  DSButton,
  DSTable,
  DSTableHeader,
  DSTableBody,
  DSTableRow,
  DSTableHead,
  DSTableCell,
  DSBadge,
  Panel,
} from '@klastack-nx/web-ui';
import * as React from 'react';

import { mockIncidents } from '../../fixtures/mock-data';

/**
 * IncidentsPage - Incident management
 *
 * Features:
 * - Incidents table
 * - Incident detail view with timeline
 * - Export Evidence button
 */

export const IncidentsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Incidents"
        description="Investigate and manage security incidents"
        actions={
          <>
            <DSButton variant="outline">Export Report</DSButton>
            <DSButton>Create Incident</DSButton>
          </>
        }
      />

      {/* Incidents Table */}
      <Panel title="Active & Recent Incidents">
        <DSTable>
          <DSTableHeader>
            <DSTableRow>
              <DSTableHead>ID</DSTableHead>
              <DSTableHead>Title</DSTableHead>
              <DSTableHead>Status</DSTableHead>
              <DSTableHead>Severity</DSTableHead>
              <DSTableHead>Created</DSTableHead>
              <DSTableHead>Assigned To</DSTableHead>
              <DSTableHead>Alerts</DSTableHead>
              <DSTableHead>Actions</DSTableHead>
            </DSTableRow>
          </DSTableHeader>
          <DSTableBody>
            {mockIncidents.map((incident) => (
              <DSTableRow key={incident.id}>
                <DSTableCell className="font-mono text-sm">{incident.id}</DSTableCell>
                <DSTableCell className="font-medium">{incident.title}</DSTableCell>
                <DSTableCell>
                  <DSBadge variant={incident.status === 'resolved' ? 'secondary' : 'outline'}>
                    {incident.status}
                  </DSBadge>
                </DSTableCell>
                <DSTableCell>
                  <DSBadge
                    variant={
                      incident.severity === 'critical' || incident.severity === 'high'
                        ? 'destructive'
                        : 'default'
                    }
                  >
                    {incident.severity}
                  </DSBadge>
                </DSTableCell>
                <DSTableCell className="text-sm">
                  {new Date(incident.createdAt).toLocaleDateString()}
                </DSTableCell>
                <DSTableCell className="text-sm">{incident.assignedTo || 'Unassigned'}</DSTableCell>
                <DSTableCell className="text-sm">{incident.alertIds.length}</DSTableCell>
                <DSTableCell>
                  <DSButton size="sm" variant="ghost">
                    View Details
                  </DSButton>
                </DSTableCell>
              </DSTableRow>
            ))}
          </DSTableBody>
        </DSTable>
      </Panel>

      {/* Incident Detail Placeholder */}
      <Panel title="Incident Detail">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select an incident to view timeline, associated alerts, map sync, and evidence export.
          </p>
          <div className="flex flex-wrap gap-2">
            <DSButton variant="outline" className="flex-1 sm:flex-none">
              View Timeline
            </DSButton>
            <DSButton variant="outline" className="flex-1 sm:flex-none">
              Sync Map
            </DSButton>
            <DSButton className="flex-1 sm:flex-none">Export Evidence</DSButton>
          </div>
        </div>
      </Panel>
    </div>
  );
};
