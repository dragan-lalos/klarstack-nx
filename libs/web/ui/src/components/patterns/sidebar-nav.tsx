import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { DSButton } from '../ds/button';

/**
 * SidebarNav - Grouped navigation sidebar
 * Displays navigation items organized into groups with headers
 */

export interface NavItem {
  /**
   * Display label for the nav item
   */
  label: string;
  /**
   * Navigation path/href
   */
  href: string;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Whether this item is currently active
   */
  isActive?: boolean;
  /**
   * Badge content (e.g., notification count)
   */
  badge?: string | number;
}

export interface NavGroup {
  /**
   * Group header label
   */
  label: string;
  /**
   * Navigation items in this group
   */
  items: NavItem[];
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Grouped navigation items
   */
  groups: NavGroup[];
  /**
   * Whether the sidebar is collapsed
   */
  collapsed?: boolean;
  /**
   * Callback when nav item is clicked
   */
  onNavigate?: (href: string) => void;
  /**
   * Optional header content (logo, title)
   */
  header?: React.ReactNode;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

function SidebarNav({
  className,
  groups,
  collapsed = false,
  onNavigate,
  header,
  footer,
  ...props
}: SidebarNavProps) {
  const handleClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <nav
      data-slot="sidebar-nav"
      className={cn('flex h-full flex-col gap-2 overflow-y-auto p-3', className)}
      {...props}
    >
      {/* Header */}
      {header && <div className="mb-4 px-2">{header}</div>}

      {/* Navigation groups */}
      <div className="flex-1 space-y-6">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Group label */}
            {!collapsed && (
              <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </div>
            )}

            {/* Group items */}
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => (
                <DSButton
                  key={itemIndex}
                  variant={item.isActive ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start gap-3', collapsed && 'justify-center px-2')}
                  asChild
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    title={collapsed ? item.label : undefined}
                  >
                    {/* Icon */}
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}

                    {/* Label and badge */}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </a>
                </DSButton>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && !collapsed && <div className="mt-auto border-t border-border pt-3">{footer}</div>}
    </nav>
  );
}

export { SidebarNav };
