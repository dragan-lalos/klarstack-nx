/**
 * @klastack-nx/web-ui - Design System Public Exports
 *
 * IMPORTANT: This is the ONLY public API for apps/web to consume.
 * Internal shadcn components (components/ui/*) are NOT exported.
 *
 * Public API consists of:
 * - DS wrappers (components/ds/*)
 * - Pattern components (components/patterns/*)
 */

// ============================================================================
// DS Wrappers (Stable Public API)
// ============================================================================

export { DSButton, buttonVariants } from './components/ds/button';
export type { DSButtonProps, DSButtonBaseProps } from './components/ds/button';

export { DSInput } from './components/ds/input';
export type { DSInputProps, DSInputBaseProps } from './components/ds/input';

export { DSTextarea } from './components/ds/textarea';
export type { DSTextareaProps, DSTextareaBaseProps } from './components/ds/textarea';

export { DSSelect } from './components/ds/select';
export type { DSSelectProps, DSSelectBaseProps } from './components/ds/select';

export { DSCheckbox } from './components/ds/checkbox';
export type { DSCheckboxProps, DSCheckboxBaseProps } from './components/ds/checkbox';

export { DSSwitch } from './components/ds/switch';
export type { DSSwitchProps, DSSwitchBaseProps } from './components/ds/switch';

export { DSBadge, badgeVariants } from './components/ds/badge';
export type { DSBadgeProps, DSBadgeBaseProps } from './components/ds/badge';

export {
  DSCard,
  DSCardHeader,
  DSCardTitle,
  DSCardDescription,
  DSCardContent,
  DSCardFooter,
} from './components/ds/card';
export type { DSCardProps } from './components/ds/card';

// NOTE: DSDialog, DSTabs, and DSToast use React Context and are client-only.
// They are NOT exported to avoid pulling client code into server components.
// Import them directly from their source files in client components only.

// NOTE: DSTabs, DSToast, and DSDialog use React Context and are client-only.
// They are NOT exported to avoid pulling client code into server components.
// Import them directly from their source files in client components only.

export {
  DSTable,
  DSTableHeader,
  DSTableBody,
  DSTableFooter,
  DSTableHead,
  DSTableRow,
  DSTableCell,
  DSTableCaption,
} from './components/ds/table';
export type { DSTableProps } from './components/ds/table';

// ============================================================================
// Pattern Components (MVP Building Blocks)
// ============================================================================
// NOTE: Pattern components with client hooks (Topbar, AppShell) are NOT exported
// to avoid pulling client-side code into server components. Import them directly
// from their source files in client components only.

export { PageHeader } from './components/patterns/page-header';
export type { PageHeaderProps } from './components/patterns/page-header';

export { FilterBar } from './components/patterns/filter-bar';
export type { FilterBarProps } from './components/patterns/filter-bar';

export { KPIStat } from './components/patterns/kpi-stat';
export type { KPIStatProps } from './components/patterns/kpi-stat';

export { EmptyState } from './components/patterns/empty-state';
export type { EmptyStateProps } from './components/patterns/empty-state';

export { Panel } from './components/patterns/panel';
export type { PanelProps } from './components/patterns/panel';

export { MapPlaceholder } from './components/patterns/map-placeholder';
export type { MapPlaceholderProps } from './components/patterns/map-placeholder';

export { EvidencePanel } from './components/patterns/evidence-panel';
export type { EvidencePanelProps, Signal } from './components/patterns/evidence-panel';

