
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockMonthlyPerformances, mockSkpTargets, mockDailyActivities, mockUsers } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TargetProgress } from './components/target-progress';
import { useMemo } from 'react';

export default function MonthlyPerformancePage() {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // --- Assume we have a logged in user ---
  const currentUser = mockUsers[0];
  const userSkpTargets = useMemo(() => mockSkpTargets.filter(t => t.userId === currentUser.id), [currentUser.id]);
  const userActivities = useMemo(() => mockDailyActivities.filter(activity => {
    const activityDate = new Date(activity.date);
    const today = new Date();
    // Filter activities from the last 30 days for this example
    const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    return activityDate >= thirtyDaysAgo;
  }), []);


  return (
    <div className="space-y-6">
      
      <Card>
        <CardHeader>
          <CardTitle>Progres Target Kinerja Bulan Ini</CardTitle>
          <CardDescription>
            Pantau pencapaian target kuantitatif Anda secara visual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TargetProgress targets={userSkpTargets} activities={userActivities} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Input Kinerja Bulanan</CardTitle>
              <CardDescription>
                Isi realisasi kinerja Anda untuk periode yang dipilih.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Bulan</Label>
                  <Select>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Pilih Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Tahun</Label>
                  <Select>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="realization">Realisasi Kinerja</Label>
                <Textarea
                  id="realization"
                  placeholder="Contoh: Menyelesaikan semua target pelayanan dengan tingkat kepuasan pasien 95%"
                  rows={5}
                />
              </div>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Simpan Kinerja
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Kinerja Bulanan</CardTitle>
              <CardDescription>
                Daftar kinerja bulanan yang telah Anda ajukan.
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
                          className={item.status === 'Disetujui' ? 'bg-accent text-accent-foreground' : ''}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
