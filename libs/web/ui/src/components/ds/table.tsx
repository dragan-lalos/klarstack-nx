import * as React from 'react';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../ui/table';

/**
 * DSTable - Design System Table Wrapper
 *
 * Thin wrapper around shadcn Table that enforces:
 * - Consistent table density and styling
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSTableProps = React.ComponentProps<typeof Table>;

function DSTable(props: DSTableProps) {
  return <Table {...props} />;
}

const DSTableHeader = TableHeader;
const DSTableBody = TableBody;
const DSTableFooter = TableFooter;
const DSTableHead = TableHead;
const DSTableRow = TableRow;
const DSTableCell = TableCell;
const DSTableCaption = TableCaption;

export {
  DSTable,
  DSTableHeader,
  DSTableBody,
  DSTableFooter,
  DSTableHead,
  DSTableRow,
  DSTableCell,
  DSTableCaption,
};
