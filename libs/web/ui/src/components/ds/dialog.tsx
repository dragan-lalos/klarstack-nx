import * as React from 'react';

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  type DialogProps,
} from '../ui/dialog';

/**
 * DSDialog - Design System Dialog Wrapper
 *
 * Thin wrapper around shadcn Dialog that enforces:
 * - Consistent modal behavior and styling
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSDialogProps = DialogProps;

const DSDialog = (props: DSDialogProps) => {
  return <Dialog {...props} />;
};
DSDialog.displayName = 'DSDialog';

const DSDialogHeader = DialogHeader;
DSDialogHeader.displayName = 'DSDialogHeader';

const DSDialogTitle = DialogTitle;
DSDialogTitle.displayName = 'DSDialogTitle';

const DSDialogDescription = DialogDescription;
DSDialogDescription.displayName = 'DSDialogDescription';

const DSDialogContent = DialogContent;
DSDialogContent.displayName = 'DSDialogContent';

const DSDialogFooter = DialogFooter;
DSDialogFooter.displayName = 'DSDialogFooter';

export {
  DSDialog,
  DSDialogHeader,
  DSDialogTitle,
  DSDialogDescription,
  DSDialogContent,
  DSDialogFooter,
};
