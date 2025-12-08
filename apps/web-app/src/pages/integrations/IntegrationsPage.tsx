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
} from '@klastack-nx/web-ui';
import * as React from 'react';

import { mockIntegrations } from '../../fixtures/mock-data';

/**
 * IntegrationsPage - External system integrations
 *
 * Features:
 * - Connectors status list (AIS, Access Control, CCTV, etc.)
 * - Health badges
 */

export const IntegrationsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Manage external system connections"
        actions={<DSButton>Add Integration</DSButton>}
      />

      {/* Integrations Table */}
      <DSTable>
        <DSTableHeader>
          <DSTableRow>
            <DSTableHead>Name</DSTableHead>
            <DSTableHead>Type</DSTableHead>
            <DSTableHead>Status</DSTableHead>
            <DSTableHead>Last Sync</DSTableHead>
            <DSTableHead>Actions</DSTableHead>
          </DSTableRow>
        </DSTableHeader>
        <DSTableBody>
          {mockIntegrations.map((integration) => (
            <DSTableRow key={integration.id}>
              <DSTableCell className="font-medium">{integration.name}</DSTableCell>
              <DSTableCell className="text-sm capitalize">
                {integration.type.replace('_', ' ')}
              </DSTableCell>
              <DSTableCell>
                <DSBadge
                  variant={
                    integration.status === 'connected'
                      ? 'default'
                      : integration.status === 'error'
                        ? 'destructive'
                        : 'outline'
                  }
                >
                  {integration.status}
                </DSBadge>
              </DSTableCell>
              <DSTableCell className="text-sm">
                {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
              </DSTableCell>
              <DSTableCell>
                <div className="flex gap-2">
                  <DSButton size="sm" variant="ghost">
                    Configure
                  </DSButton>
                  <DSButton size="sm" variant="outline">
                    Test
                  </DSButton>
                </div>
              </DSTableCell>
            </DSTableRow>
          ))}
        </DSTableBody>
      </DSTable>
    </div>
  );
};
