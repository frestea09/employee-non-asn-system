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
import { mockValidationPerformances } from '@/lib/data';

export default function ValidatePerformancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Validasi Kinerja Bulanan</CardTitle>
        <CardDescription>
          Setujui atau tolak realisasi kinerja bulanan yang diajukan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Periode</TableHead>
              <TableHead>Nama Karyawan</TableHead>
              <TableHead>Realisasi</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockValidationPerformances.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.month} {item.year}</TableCell>
                <TableCell>Karyawan Non-ASN</TableCell>
                <TableCell>{item.realization}</TableCell>
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
        {mockValidationPerformances.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Tidak ada kinerja yang menunggu validasi.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
