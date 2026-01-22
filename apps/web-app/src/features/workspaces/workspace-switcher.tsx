import { memo, useMemo } from 'react';

import { useWorkspace } from './workspace.store';
import { Select } from '../../shared/ui/select';

interface WorkspaceSwitcherProps {
  compact?: boolean;
}

/**
 * Workspace selector dropdown.
 */
export const WorkspaceSwitcher = memo(({ compact }: WorkspaceSwitcherProps) => {
  const { workspaces, currentWorkspaceId, setWorkspaceId, isLoading } = useWorkspace();

  const options = useMemo(
    () =>
      workspaces.map((workspace) => ({
        value: workspace.id,
        label: workspace.name,
      })),
    [workspaces],
  );

  return (
    <Select
      aria-label="Workspace"
      className={compact ? 'h-9 text-xs' : 'min-w-[180px]'}
      value={currentWorkspaceId ?? ''}
      onChange={(event) => setWorkspaceId(event.target.value)}
      disabled={isLoading || workspaces.length === 0}
      options={
        options.length > 0
          ? options
          : [
              {
                value: '',
                label: isLoading ? 'Loading workspaces...' : 'No workspaces',
              },
            ]
      }
    />
  );
});

WorkspaceSwitcher.displayName = 'WorkspaceSwitcher';
