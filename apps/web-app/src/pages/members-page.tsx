import { useMemo } from 'react';

import { useMe } from '../features/me/me.query';
import { useWorkspace } from '../features/workspaces/workspace.store';
import { PageHeader } from '../shared/patterns';
import { Badge } from '../shared/ui/badge';
import { Card, CardContent } from '../shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../shared/ui/table';

/**
 * Members list page built from /me memberships.
 */
export const MembersPage = () => {
  const { memberships, isLoading } = useMe();
  const { workspaces } = useWorkspace();

  const workspaceLookup = useMemo(() => {
    const map = new Map(workspaces.map((workspace) => [workspace.id, workspace.name]));
    return map;
  }, [workspaces]);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading memberships...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Members"
        subtitle="Roles and workspace access for the current account."
      />

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workspace</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Workspace ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.map((membership) => {
                const workspaceName =
                  membership.workspace?.name ??
                  membership.workspaceName ??
                  workspaceLookup.get(membership.workspaceId) ??
                  'Unknown workspace';
                return (
                  <TableRow key={membership.id}>
                    <TableCell>{workspaceName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{membership.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {membership.workspaceId}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
