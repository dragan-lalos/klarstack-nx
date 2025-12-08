import {
  AppShell,
  SidebarNav,
  Topbar,
  PageHeader,
  FilterBar,
  KPIStat,
  EmptyState,
  EvidencePanel,
  MapPlaceholder,
  DSButton,
} from '@klastack-nx/web-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Demo page showing all MVP pattern components
 * This validates the layout composition
 */
export function PatternsDemo() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Sample navigation structure
  const navGroups = [
    {
      label: 'Main',
      items: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          isActive: true,
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          ),
        },
        {
          label: 'Analytics',
          href: '/analytics',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          ),
          badge: 3,
        },
      ],
    },
    {
      label: 'Data',
      items: [
        {
          label: 'Sources',
          href: '/sources',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5V19A9 3 0 0 0 21 19V5" />
              <path d="M3 12A9 3 0 0 0 21 12" />
            </svg>
          ),
        },
        {
          label: 'Maps',
          href: '/maps',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <AppShell
      sidebarCollapsed={sidebarCollapsed}
      sidebar={
        <SidebarNav
          groups={navGroups}
          collapsed={sidebarCollapsed}
          header={
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                V
              </div>
              <span className="text-lg font-bold">Klastack-nx</span>
            </div>
          }
          footer={
            <DSButton
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full"
            >
              {sidebarCollapsed ? '→' : '←'} Collapse
            </DSButton>
          }
        />
      }
      topbar={<Topbar left={<span className="text-lg font-semibold">Dashboard</span>} />}
    >
      {/* Page content */}
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <PageHeader
          title="Analytics Dashboard"
          description="Monitor key metrics and performance indicators"
          breadcrumbs={
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span>Dashboard</span>
            </div>
          }
          actions={
            <>
              <DSButton variant="outline">Export</DSButton>
              <DSButton>Create Report</DSButton>
            </>
          }
        />

        {/* Filter Bar */}
        <FilterBar
          filters={
            <>
              <DSButton variant="outline" size="sm">
                Date Range
              </DSButton>
              <DSButton variant="outline" size="sm">
                Category
              </DSButton>
              <DSButton variant="outline" size="sm">
                Status
              </DSButton>
            </>
          }
          quickFilters={
            <>
              <DSButton variant="ghost" size="sm">
                Today
              </DSButton>
              <DSButton variant="ghost" size="sm">
                This Week
              </DSButton>
              <DSButton variant="ghost" size="sm">
                This Month
              </DSButton>
            </>
          }
          activeCount={2}
          onClear={() => console.log('Clear filters')}
        />

        {/* KPI Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPIStat
            label="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            trend="up"
            description="From last month"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <KPIStat
            label="Active Users"
            value="2,350"
            change="+10.5%"
            trend="up"
            description="From last month"
          />
          <KPIStat
            label="Conversion Rate"
            value="3.2%"
            change="-2.3%"
            trend="down"
            description="From last month"
          />
          <KPIStat label="Avg. Session" value="4m 32s" trend="neutral" description="No change" />
        </div>

        {/* Map Placeholder */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Geographic Distribution</h2>
          <MapPlaceholder height={400} />
        </div>

        {/* Evidence Panel */}
        <div className="grid gap-4 lg:grid-cols-2">
          <EvidencePanel
            title="Analysis Evidence"
            reasoning="Revenue growth is driven by increased user engagement and improved conversion rates in the EMEA region. The expansion of our product line has contributed significantly to the positive trend."
            signals={[
              {
                label: 'User Engagement',
                value: 'Up 15% week-over-week',
                strength: 'high',
                icon: (
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                label: 'Product Adoption',
                value: 'New features used by 68% of users',
                strength: 'high',
              },
              {
                label: 'Market Conditions',
                value: 'Favorable in target regions',
                strength: 'medium',
              },
            ]}
          />

          <EvidencePanel
            title="Risk Factors"
            reasoning="Increased competition in the market and seasonal variations may impact future growth. Customer acquisition costs have risen slightly."
            signals={[
              {
                label: 'Competition',
                value: '3 new competitors entered market',
                strength: 'medium',
              },
              {
                label: 'CAC Trend',
                value: 'Up 8% from previous quarter',
                strength: 'low',
              },
            ]}
          />
        </div>

        {/* Empty State Example */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Recent Reports</h2>
          <EmptyState
            title="No reports yet"
            description="Get started by creating your first report. Reports help you track and analyze your data over time."
            action={{
              label: 'Create Report',
              onClick: () => console.log('Create report'),
            }}
            secondaryAction={{
              label: 'Learn More',
              onClick: () => console.log('Learn more'),
            }}
            icon={
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            }
          />
        </div>
      </div>
    </AppShell>
  );
}

export default PatternsDemo;
