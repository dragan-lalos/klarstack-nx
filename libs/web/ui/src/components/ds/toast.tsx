import * as React from 'react';

import { Toast, useToast, type ToastProps } from '../ui/toast';

/**
 * DSToast - Design System Toast Wrapper
 *
 * Thin wrapper around toast utility that enforces:
 * - Consistent toast styling and behavior
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSToastProps = ToastProps;

const DSToast = (props: DSToastProps) => {
  return <Toast {...props} />;
};
DSToast.displayName = 'DSToast';

export { DSToast, useToast };
export type { ToastProps as DSToastBaseProps };
