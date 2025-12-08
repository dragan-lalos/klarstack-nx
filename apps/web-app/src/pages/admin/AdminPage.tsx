import {
  PageHeader,
  DSTabs,
  DSTabsList,
  DSTabsTrigger,
  DSTabsContent,
  DSButton,
  DSTable,
  DSTableHeader,
  DSTableBody,
  DSTableRow,
  DSTableHead,
  DSTableCell,
  DSBadge,
  Panel,
} from '@klastack-nx/web-ui';
import * as React from 'react';

import { mockUsers } from '../../fixtures/mock-data';

/**
 * AdminPage - System administration
 *
 * Features:
 * - Users table
 * - RBAC placeholder
 * - Audit log placeholder
 */

export const AdminPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Administration" description="System configuration and user management" />

      <DSTabs defaultValue="users">
        <DSTabsList>
          <DSTabsTrigger value="users">Users</DSTabsTrigger>
          <DSTabsTrigger value="rbac">Roles & Permissions</DSTabsTrigger>
          <DSTabsTrigger value="audit">Audit Log</DSTabsTrigger>
          <DSTabsTrigger value="system">System Settings</DSTabsTrigger>
        </DSTabsList>

        {/* Users Tab */}
        <DSTabsContent value="users">
          <Panel title="User Management" headerActions={<DSButton size="sm">Invite User</DSButton>}>
            <DSTable>
              <DSTableHeader>
                <DSTableRow>
                  <DSTableHead>Name</DSTableHead>
                  <DSTableHead>Email</DSTableHead>
                  <DSTableHead>Role</DSTableHead>
                  <DSTableHead>Last Active</DSTableHead>
                  <DSTableHead>Actions</DSTableHead>
                </DSTableRow>
              </DSTableHeader>
              <DSTableBody>
                {mockUsers.map((user) => (
                  <DSTableRow key={user.id}>
                    <DSTableCell className="font-medium">{user.name}</DSTableCell>
                    <DSTableCell className="text-sm">{user.email}</DSTableCell>
                    <DSTableCell>
                      <DSBadge variant="outline">{user.role}</DSBadge>
                    </DSTableCell>
                    <DSTableCell className="text-sm">
                      {new Date(user.lastActive).toLocaleString()}
                    </DSTableCell>
                    <DSTableCell>
                      <DSButton size="sm" variant="ghost">
                        Edit
                      </DSButton>
                    </DSTableCell>
                  </DSTableRow>
                ))}
              </DSTableBody>
            </DSTable>
          </Panel>
        </DSTabsContent>

        {/* RBAC Tab */}
        <DSTabsContent value="rbac">
          <Panel title="Roles & Permissions">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure role-based access control and permission sets
              </p>
              <div className="flex flex-wrap gap-2">
                <DSButton variant="outline" className="flex-1 sm:flex-none">
                  Manage Roles
                </DSButton>
                <DSButton variant="outline" className="flex-1 sm:flex-none">
                  Permission Matrix
                </DSButton>
              </div>
            </div>
          </Panel>
        </DSTabsContent>

        {/* Audit Log Tab */}
        <DSTabsContent value="audit">
          <Panel title="Audit Log">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                System activity and security audit trail
              </p>
              <DSButton variant="outline">Export Logs</DSButton>
            </div>
          </Panel>
        </DSTabsContent>

        {/* System Settings Tab */}
        <DSTabsContent value="system">
          <Panel title="System Settings">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure system-wide settings and preferences
              </p>
              <div className="flex flex-wrap gap-2">
                <DSButton variant="outline" className="flex-1 sm:flex-none">
                  General Settings
                </DSButton>
                <DSButton variant="outline" className="flex-1 sm:flex-none">
                  Notification Rules
                </DSButton>
                <DSButton variant="outline" className="flex-1 sm:flex-none">
                  API Keys
                </DSButton>
              </div>
            </div>
          </Panel>
        </DSTabsContent>
      </DSTabs>
    </div>
  );
};
