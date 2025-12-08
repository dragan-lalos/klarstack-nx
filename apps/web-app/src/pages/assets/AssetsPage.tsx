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

import { mockAssets } from '../../fixtures/mock-data';

/**
 * AssetsPage - Asset inventory and management
 *
 * Features:
 * - Assets table with type, criticality, and status
 */

export const AssetsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Assets"
        description="Manage security assets and devices"
        actions={
          <>
            <DSButton variant="outline">Import Assets</DSButton>
            <DSButton>Add Asset</DSButton>
          </>
        }
      />

      {/* Assets Table */}
      <DSTable>
        <DSTableHeader>
          <DSTableRow>
            <DSTableHead>ID</DSTableHead>
            <DSTableHead>Name</DSTableHead>
            <DSTableHead>Type</DSTableHead>
            <DSTableHead>Criticality</DSTableHead>
            <DSTableHead>Status</DSTableHead>
            <DSTableHead>Zone</DSTableHead>
            <DSTableHead>Last Seen</DSTableHead>
            <DSTableHead>Actions</DSTableHead>
          </DSTableRow>
        </DSTableHeader>
        <DSTableBody>
          {mockAssets.map((asset) => (
            <DSTableRow key={asset.id}>
              <DSTableCell className="font-mono text-sm">{asset.id}</DSTableCell>
              <DSTableCell className="font-medium">{asset.name}</DSTableCell>
              <DSTableCell className="text-sm capitalize">
                {asset.type.replace('_', ' ')}
              </DSTableCell>
              <DSTableCell>
                <DSBadge variant={asset.criticality === 'critical' ? 'destructive' : 'default'}>
                  {asset.criticality}
                </DSBadge>
              </DSTableCell>
              <DSTableCell>
                <DSBadge
                  variant={
                    asset.status === 'online'
                      ? 'default'
                      : asset.status === 'offline'
                        ? 'destructive'
                        : 'outline'
                  }
                >
                  {asset.status}
                </DSBadge>
              </DSTableCell>
              <DSTableCell className="text-sm">{asset.zoneId}</DSTableCell>
              <DSTableCell className="text-sm">
                {new Date(asset.lastSeen).toLocaleString()}
              </DSTableCell>
              <DSTableCell>
                <DSButton size="sm" variant="ghost">
                  Configure
                </DSButton>
              </DSTableCell>
            </DSTableRow>
          ))}
        </DSTableBody>
      </DSTable>
    </div>
  );
};
