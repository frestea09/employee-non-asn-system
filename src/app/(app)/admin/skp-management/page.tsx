import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SkpManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen SKP</CardTitle>
        <CardDescription>
          Kelola Sasaran Kinerja Pegawai (SKP) untuk setiap karyawan non-ASN.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-10 text-center text-sm text-muted-foreground">
          Fitur manajemen SKP akan segera tersedia.
        </div>
      </CardContent>
    </Card>
  );
}
