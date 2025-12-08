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

export {
  DSDialog,
  DSDialogHeader,
  DSDialogTitle,
  DSDialogDescription,
  DSDialogContent,
  DSDialogFooter,
} from './components/ds/dialog';
export type { DSDialogProps } from './components/ds/dialog';

export { DSTabs, DSTabsList, DSTabsTrigger, DSTabsContent } from './components/ds/tabs';
export type {
  DSTabsProps,
  DSTabsBaseProps,
  DSTabsTriggerBaseProps,
  DSTabsContentBaseProps,
} from './components/ds/tabs';

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

export { DSToast, useToast } from './components/ds/toast';
export type { DSToastProps, DSToastBaseProps } from './components/ds/toast';

// ============================================================================
// Pattern Components (MVP Building Blocks)
// ============================================================================

export { AppShell } from './components/patterns/app-shell';
export type { AppShellProps } from './components/patterns/app-shell';

export { SidebarNav } from './components/patterns/sidebar-nav';
export type { SidebarNavProps, NavItem, NavGroup } from './components/patterns/sidebar-nav';

export { Topbar } from './components/patterns/topbar';
export type { TopbarProps } from './components/patterns/topbar';

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

// ============================================================================
// Hooks
// ============================================================================

export { useTheme } from './hooks/use-theme';
export type { Theme } from './hooks/use-theme';
