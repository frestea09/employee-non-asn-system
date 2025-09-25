import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function UserManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Pengguna</CardTitle>
        <CardDescription>
          Kelola pengguna, peran, dan unit kerja.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-10 text-center text-sm text-muted-foreground">
          Fitur manajemen pengguna akan segera tersedia.
        </div>
      </CardContent>
    </Card>
  );
}
