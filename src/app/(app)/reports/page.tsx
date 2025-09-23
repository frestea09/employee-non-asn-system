import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ReportsPage() {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Laporan Penilaian Kinerja</CardTitle>
        <CardDescription>
          Pilih periode untuk membuat dan mengunduh laporan penilaian kinerja bulanan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="grid flex-1 gap-2">
            <label htmlFor="month">Bulan</label>
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
          <div className="grid flex-1 gap-2">
            <label htmlFor="year">Tahun</label>
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
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Buat Laporan
          </Button>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
                Pilih bulan dan tahun untuk melihat pratinjau laporan di sini.
            </p>
        </div>

      </CardContent>
    </Card>
  );
}
