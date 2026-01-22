import { useWorkspaceStats } from '../features/dashboard/dashboard.query';
import { KPIStat, PageHeader } from '../shared/patterns';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../shared/ui/table';

const activityRows = [
  { id: 'a-1', action: 'Updated member role', user: 'Alex Park', time: '2h ago' },
  { id: 'a-2', action: 'Added new workspace', user: 'Team Admin', time: '6h ago' },
  { id: 'a-3', action: 'Changed notification settings', user: 'Jamie Lee', time: 'Yesterday' },
];

/**
 * Dashboard overview page.
 */
export const DashboardPage = () => {
  const { stats, isLoading } = useWorkspaceStats();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your workspaces and membership activity."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <KPIStat
          label="Active projects"
          value={isLoading ? '...' : String(stats?.activeProjects ?? 0)}
          trend="Workspace-scoped"
        />
        <KPIStat
          label="Members"
          value={isLoading ? '...' : String(stats?.memberCount ?? 0)}
          trend="Current workspace"
        />
        <KPIStat
          label="Pending invites"
          value={isLoading ? '...' : String(stats?.pendingInvites ?? 0)}
          trend="Needs review"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell className="text-muted-foreground">{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
