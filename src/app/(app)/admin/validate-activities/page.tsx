
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { mockValidationActivities } from '@/lib/data';

export default function ValidateActivitiesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Validasi Aktivitas Harian</CardTitle>
        <CardDescription>
          Setujui atau tolak aktivitas harian yang diajukan oleh karyawan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nama Karyawan</TableHead>
              <TableHead>Aktivitas</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockValidationActivities.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell>Karyawan Non-ASN</TableCell>
                <TableCell>{item.activity}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/80">
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Setujui</span>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Tolak</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         {mockValidationActivities.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Tidak ada aktivitas yang menunggu validasi.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    