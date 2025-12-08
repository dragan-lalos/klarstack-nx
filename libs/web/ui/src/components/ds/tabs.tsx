import * as React from 'react';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from '../ui/tabs';

/**
 * DSTabs - Design System Tabs Wrapper
 *
 * Thin wrapper around shadcn Tabs that enforces:
 * - Consistent tab styling and behavior
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSTabsProps = TabsProps;

const DSTabs = (props: DSTabsProps) => {
  return <Tabs {...props} />;
};
DSTabs.displayName = 'DSTabs';

const DSTabsList = TabsList;
DSTabsList.displayName = 'DSTabsList';

const DSTabsTrigger = (props: TabsTriggerProps) => {
  return <TabsTrigger {...props} />;
};
DSTabsTrigger.displayName = 'DSTabsTrigger';

const DSTabsContent = (props: TabsContentProps) => {
  return <TabsContent {...props} />;
};
DSTabsContent.displayName = 'DSTabsContent';

export { DSTabs, DSTabsList, DSTabsTrigger, DSTabsContent };
export type {
  TabsProps as DSTabsBaseProps,
  TabsTriggerProps as DSTabsTriggerBaseProps,
  TabsContentProps as DSTabsContentBaseProps,
};
