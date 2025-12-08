import {
  PageHeader,
  DSButton,
  Panel,
  EmptyState,
  DSCard,
  DSCardHeader,
  DSCardTitle,
  DSCardContent,
} from '@klastack-nx/web-ui';
import * as React from 'react';

import { mockZones } from '../../fixtures/mock-data';

/**
 * ZonesPage - Zone management and configuration
 *
 * Features:
 * - Zones list with counts
 * - Zone detail panel
 * - GeoJSON import placeholder
 */

export const ZonesPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Zones"
        description="Manage security zones and boundaries"
        actions={<DSButton>Create Zone</DSButton>}
      />

      {/* Zones Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockZones.map((zone) => (
          <DSCard key={zone.id}>
            <DSCardHeader>
              <DSCardTitle className="text-lg">{zone.name}</DSCardTitle>
            </DSCardHeader>
            <DSCardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium capitalize">{zone.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assets:</span>
                  <span className="font-medium">{zone.assetCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Alerts:</span>
                  <span className="font-medium">{zone.alertCount}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <DSButton size="sm" variant="outline" className="flex-1">
                  View
                </DSButton>
                <DSButton size="sm" variant="ghost" className="flex-1">
                  Edit
                </DSButton>
              </div>
            </DSCardContent>
          </DSCard>
        ))}
      </div>

      {/* Zone Detail Placeholder */}
      <Panel title="Zone Configuration">
        <EmptyState
          title="No Zone Selected"
          message="Select a zone to view boundaries, assets, and configure monitoring rules"
          action={{
            label: 'Import GeoJSON',
            onClick: () => console.log('Import GeoJSON'),
          }}
        />
      </Panel>
    </div>
  );
};
