
'use client';

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
import { Badge } from '@/components/ui/badge';
import {
  mockMonthlyPerformances,
  mockSkpTargets,
  mockUsers,
} from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import { useMemo } from 'react';
import { MonthlyTargetReport } from './components/monthly-target-report';

export default function MonthlyPerformancePage() {
  // --- Assume we have a logged in user ---
  const currentUser = mockUsers[0];
  const userSkpTargets = useMemo(
    () => mockSkpTargets.filter((t) => t.userId === currentUser.id),
    [currentUser.id]
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Laporan Realisasi Target Bulanan</CardTitle>
          <CardDescription>
            Isi total pencapaian kuantitatif Anda untuk setiap target dalam
            periode bulan ini. Data ini akan digunakan untuk laporan kinerja
            Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyTargetReport targets={userSkpTargets} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pengajuan Kinerja</CardTitle>
          <CardDescription>
            Daftar laporan kinerja bulanan yang telah Anda ajukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Periode</TableHead>
                <TableHead>Realisasi</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMonthlyPerformances.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.month} {item.year}
                  </TableCell>
                  <TableCell>{item.realization}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        item.status === 'Disetujui'
                          ? 'default'
                          : item.status === 'Ditolak'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={
                        item.status === 'Disetujui'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {mockMonthlyPerformances.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Belum ada laporan kinerja yang diajukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
