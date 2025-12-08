import * as React from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';

/**
 * DSCard - Design System Card Wrapper
 *
 * Thin wrapper around shadcn Card that enforces:
 * - Consistent border radius and shadow
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export type DSCardProps = React.ComponentProps<typeof Card>;

function DSCard(props: DSCardProps) {
  return <Card {...props} />;
}

const DSCardHeader = CardHeader;
const DSCardTitle = CardTitle;
const DSCardDescription = CardDescription;
const DSCardContent = CardContent;
const DSCardFooter = CardFooter;

export { DSCard, DSCardHeader, DSCardTitle, DSCardDescription, DSCardContent, DSCardFooter };
