import * as React from 'react';

import { Switch, type SwitchProps } from '../ui/switch';

/**
 * DSSwitch - Design System Switch Wrapper
 *
 * Thin wrapper around shadcn Switch that enforces:
 * - Consistent size and focus ring
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSSwitchProps = SwitchProps;

function DSSwitch(props: DSSwitchProps) {
  return <Switch {...props} />;
}

export { DSSwitch };
export type { SwitchProps as DSSwitchBaseProps };
