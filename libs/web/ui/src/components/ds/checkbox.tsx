import * as React from 'react';

import { Checkbox, type CheckboxProps } from '../ui/checkbox';

/**
 * DSCheckbox - Design System Checkbox Wrapper
 *
 * Thin wrapper around shadcn Checkbox that enforces:
 * - Consistent size and focus ring
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSCheckboxProps = CheckboxProps;

function DSCheckbox(props: DSCheckboxProps) {
  return <Checkbox {...props} />;
}

export { DSCheckbox };
export type { CheckboxProps as DSCheckboxBaseProps };
