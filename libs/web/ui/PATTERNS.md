# @klastack-nx/web-ui Patterns

MVP pattern components for building consistent application layouts and interfaces.

## Overview

Pattern components are higher-level UI compositions that combine design system primitives (like `Button`) with minimal Tailwind classes to create reusable layout and interface patterns.

## Components

### Layout Patterns

#### AppShell

Main application layout wrapper providing core structure with sidebar and topbar.

```tsx
import { AppShell, SidebarNav, Topbar } from '@klastack-nx/web-ui';

<AppShell sidebar={<SidebarNav {...navProps} />} topbar={<Topbar />} sidebarCollapsed={false}>
  {/* Page content */}
</AppShell>;
```

**Props:**

- `sidebar` - Sidebar content (typically SidebarNav)
- `topbar` - Top navigation bar (typically Topbar)
- `sidebarCollapsed` - Whether sidebar is collapsed
- `children` - Main content area

---

#### SidebarNav

Grouped navigation sidebar with support for icons, badges, and collapse states.

```tsx
import { SidebarNav } from '@klastack-nx/web-ui';

const navGroups = [
  {
    label: 'Main',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        isActive: true,
        icon: <DashboardIcon />,
        badge: 5,
      },
    ],
  },
];

<SidebarNav
  groups={navGroups}
  collapsed={false}
  onNavigate={(href) => router.push(href)}
  header={<Logo />}
  footer={<Settings />}
/>;
```

**Props:**

- `groups` - Array of navigation groups with items
- `collapsed` - Collapsed state
- `onNavigate` - Navigation callback
- `header` - Optional header content (logo, title)
- `footer` - Optional footer content

**NavItem Interface:**

- `label` - Display text
- `href` - Navigation path
- `icon` - Optional icon element
- `isActive` - Active state
- `badge` - Optional badge content

---

#### Topbar

Application top navigation with search, time, theme, and user placeholders.

```tsx
import { Topbar } from '@klastack-nx/web-ui';

<Topbar
  left={<PageTitle />}
  right={<CustomActions />}
  showSearch={true}
  showTime={true}
  showTheme={true}
  showUser={true}
/>;
```

**Props:**

- `left` - Left-aligned content
- `right` - Right-aligned content
- `showSearch` - Show search placeholder
- `showTime` - Show time/clock placeholder
- `showTheme` - Show theme toggle placeholder
- `showUser` - Show user menu placeholder

---

### Page Patterns

#### PageHeader

Page header section with title, description, breadcrumbs, and actions.

```tsx
import { PageHeader, Button } from '@klastack-nx/web-ui';

<PageHeader
  title="Analytics Dashboard"
  description="Monitor key metrics and performance"
  breadcrumbs={<Breadcrumbs />}
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>Create</Button>
    </>
  }
/>;
```

**Props:**

- `title` - Page title
- `description` - Optional subtitle
- `actions` - Action buttons
- `breadcrumbs` - Navigation breadcrumbs

---

#### FilterBar

Filter controls bar with quick filters and active count.

```tsx
import { FilterBar, Button } from '@klastack-nx/web-ui';

<FilterBar
  filters={
    <>
      <Button variant="outline" size="sm">
        Date Range
      </Button>
      <Button variant="outline" size="sm">
        Category
      </Button>
    </>
  }
  quickFilters={
    <>
      <Button variant="ghost" size="sm">
        Today
      </Button>
      <Button variant="ghost" size="sm">
        This Week
      </Button>
    </>
  }
  activeCount={2}
  onClear={() => clearFilters()}
  actions={<ExportButton />}
/>;
```

**Props:**

- `filters` - Filter controls (dropdowns, inputs)
- `quickFilters` - Quick filter chips
- `activeCount` - Number of active filters
- `onClear` - Clear filters callback
- `actions` - Additional actions

---

### Data Display Patterns

#### KPIStat

Key Performance Indicator display with trend indicators.

```tsx
import { KPIStat } from '@klastack-nx/web-ui';

<KPIStat
  label="Total Revenue"
  value="$45,231.89"
  change="+20.1%"
  trend="up"
  description="From last month"
  icon={<RevenueIcon />}
  variant="default"
/>;
```

**Props:**

- `label` - Stat label
- `value` - Primary value
- `change` - Change indicator (e.g., "+12.5%")
- `trend` - `'up' | 'down' | 'neutral'`
- `description` - Additional context
- `icon` - Optional icon
- `variant` - `'default' | 'compact'`

---

#### EvidencePanel

Analysis evidence display showing reasoning (WHY) and supporting signals.

```tsx
import { EvidencePanel } from '@klastack-nx/web-ui';

<EvidencePanel
  title="Analysis Evidence"
  reasoning="Revenue growth is driven by increased user engagement..."
  signals={[
    {
      label: 'User Engagement',
      value: 'Up 15% week-over-week',
      strength: 'high',
      icon: <EngagementIcon />,
    },
  ]}
  variant="default"
/>;
```

**Props:**

- `title` - Panel title
- `reasoning` - Main reasoning (WHY section)
- `signals` - Array of supporting signals
- `variant` - `'default' | 'compact'`

**Signal Interface:**

- `label` - Signal name
- `value` - Signal value/description
- `strength` - `'high' | 'medium' | 'low'`
- `icon` - Optional icon

---

#### EmptyState

Empty state placeholder with actions.

```tsx
import { EmptyState } from '@klastack-nx/web-ui';

<EmptyState
  title="No reports yet"
  description="Get started by creating your first report"
  icon={<EmptyIcon />}
  action={{
    label: 'Create Report',
    onClick: () => createReport(),
  }}
  secondaryAction={{
    label: 'Learn More',
    onClick: () => openDocs(),
  }}
/>;
```

**Props:**

- `title` - Main heading
- `description` - Explanation message
- `icon` - Optional icon/illustration
- `action` - Primary action `{ label, onClick }`
- `secondaryAction` - Secondary action

---

#### MapPlaceholder

Placeholder for map components with loading state and controls.

```tsx
import { MapPlaceholder } from '@klastack-nx/web-ui';

<MapPlaceholder loading={false} message="Map view" height={400} controls={<CustomMapControls />} />;
```

**Props:**

- `loading` - Loading state
- `message` - Placeholder message
- `height` - Height (number in px or string)
- `controls` - Optional custom controls

---

## Usage Example

See `apps/web/src/app/patterns-demo.tsx` for a complete working example demonstrating all pattern components composed together.

```tsx
import {
  AppShell,
  SidebarNav,
  Topbar,
  PageHeader,
  FilterBar,
  KPIStat,
  EmptyState,
  EvidencePanel,
  MapPlaceholder
} from '@klastack-nx/web-ui';

export function MyPage() {
  return (
    <AppShell
      sidebar={<SidebarNav groups={navGroups} />}
      topbar={<Topbar />}
    >
      <PageHeader title="Dashboard" />
      <FilterBar filters={...} />

      <div className="grid gap-4 md:grid-cols-4">
        <KPIStat label="Revenue" value="$45K" trend="up" />
        {/* More stats */}
      </div>

      <MapPlaceholder />
      <EvidencePanel reasoning="..." signals={...} />
    </AppShell>
  );
}
```

## Design Principles

1. **Composable** - Patterns compose DS wrappers (Button, etc.) and minimal Tailwind
2. **Flexible** - Accept custom content via props and children
3. **Type-safe** - Full TypeScript interfaces for all props
4. **Accessible** - Semantic HTML and ARIA attributes
5. **Themeable** - Use design tokens from `@klastack-nx/web-ui-utils`

## File Structure

```
libs/web/ui/src/patterns/
├── app-shell.tsx          # Main layout wrapper
├── sidebar-nav.tsx        # Grouped navigation
├── topbar.tsx            # Top bar with placeholders
├── page-header.tsx       # Page header section
├── filter-bar.tsx        # Filter controls
├── kpi-stat.tsx          # KPI display
├── empty-state.tsx       # Empty states
├── evidence-panel.tsx    # Evidence/WHY panel
├── map-placeholder.tsx   # Map placeholder
└── index.ts              # Exports
```

## Contributing

When adding new pattern components:

1. Create component file in `libs/web/ui/src/patterns/`
2. Use DS wrappers from `../button`, etc.
3. Add minimal Tailwind classes for layout
4. Export from `patterns/index.ts`
5. Document in this README
6. Add to patterns-demo.tsx for validation

## Related

- `@klastack-nx/web-ui-utils` - Design tokens and utilities
- `libs/web/ui/src/button.tsx` - Base DS components
