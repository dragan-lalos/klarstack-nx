import {
  PageHeader,
  DSButton,
  Panel,
  DSCard,
  DSCardHeader,
  DSCardTitle,
  DSCardContent,
} from '@klastack-nx/web-ui';
import * as React from 'react';

/**
 * AnalyticsPage - Analytics and reporting
 *
 * Features:
 * - Chart placeholders
 * - Report templates list
 */

export const AnalyticsPage = () => {
  const chartPlaceholder = (title: string) => (
    <DSCard>
      <DSCardHeader>
        <DSCardTitle className="text-lg">{title}</DSCardTitle>
      </DSCardHeader>
      <DSCardContent>
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
          <div className="text-center text-muted-foreground">
            <div className="text-sm font-semibold">Chart Visualization</div>
            <div className="mt-1 text-xs">Data visualization will render here</div>
          </div>
        </div>
      </DSCardContent>
    </DSCard>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Security metrics and trend analysis"
        actions={
          <>
            <DSButton variant="outline">Schedule Report</DSButton>
            <DSButton>Export Data</DSButton>
          </>
        }
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {chartPlaceholder('Alert Trends (Last 30 Days)')}
        {chartPlaceholder('Incident Response Times')}
        {chartPlaceholder('Zone Activity Heatmap')}
      </div>

      {/* Report Templates */}
      <Panel
        title="Report Templates"
        headerActions={<DSButton size="sm">Create Template</DSButton>}
      >
        <div className="space-y-3">
          {[
            'Daily Security Summary',
            'Weekly Incident Report',
            'Monthly Compliance Report',
            'Asset Health Report',
          ].map((template) => (
            <div
              key={template}
              className="flex items-center justify-between rounded-lg border border-border p-4"
            >
              <div>
                <div className="font-medium">{template}</div>
                <div className="text-sm text-muted-foreground">Automated report generation</div>
              </div>
              <div className="flex gap-2">
                <DSButton size="sm" variant="outline">
                  Preview
                </DSButton>
                <DSButton size="sm">Generate</DSButton>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};
