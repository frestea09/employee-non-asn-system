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
import { mockUsers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function SkpManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen SKP</CardTitle>
        <CardDescription>
          Kelola Sasaran Kinerja Pegawai (SKP) untuk setiap karyawan non-ASN.
          Pilih karyawan untuk melihat atau menetapkan target kinerja.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Nomor Induk</TableHead>
                <TableHead>Unit Kerja</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.ni}</TableCell>
                  <TableCell>{user.unit}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Kelola SKP
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
