import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function WorkPlanPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Rencana Kerja</CardTitle>
        <CardDescription>
          Kelola rencana kerja tahunan untuk setiap unit dan individu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-10 text-center text-sm text-muted-foreground">
          Fitur manajemen rencana kerja akan segera tersedia.
        </div>
      </CardContent>
    </Card>
  );
}
