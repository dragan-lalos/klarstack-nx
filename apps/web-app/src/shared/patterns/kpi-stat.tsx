import { Card, CardContent } from '../ui/card';

interface KPIStatProps {
  label: string;
  value: string;
  trend?: string;
}

/**
 * KPI stat card with label/value.
 */
export const KPIStat = ({ label, value, trend }: KPIStatProps) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold text-foreground">{value}</div>
        {trend && <div className="text-xs text-muted-foreground">{trend}</div>}
      </CardContent>
    </Card>
  );
};
