import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Dialog component (simplified HTML dialog)
 * For production, consider using @radix-ui/react-dialog for better a11y
 */
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({ open = false, onOpenChange, children }: DialogProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange?.(false);
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />}
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
          open ? 'block' : 'hidden',
        )}
      >
        {children}
      </dialog>
    </>
  );
};
Dialog.displayName = 'Dialog';

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
);
DialogDescription.displayName = 'DialogDescription';

const DialogContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-4', className)} {...props} />
);
DialogContent.displayName = 'DialogContent';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter };
