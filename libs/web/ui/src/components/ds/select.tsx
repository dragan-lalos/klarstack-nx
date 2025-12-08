import * as React from 'react';

import { Select, type SelectProps } from '../ui/select';

/**
 * DSSelect - Design System Select Wrapper
 *
 * Thin wrapper around shadcn Select that enforces:
 * - Consistent height and styling
 * - Default focus ring behavior
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSSelectProps = SelectProps;

function DSSelect(props: DSSelectProps) {
  return <Select {...props} />;
}

export { DSSelect };
export type { SelectProps as DSSelectBaseProps };
