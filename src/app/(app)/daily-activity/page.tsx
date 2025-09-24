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
import { mockDailyActivities } from '@/lib/data';
import {
  CalendarIcon,
  PlusCircle,
  Upload,
  Pencil,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function DailyActivityPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Aktivitas Harian</CardTitle>
            <CardDescription>
              Catat aktivitas yang Anda lakukan hari ini secara terperinci.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal h-12 text-base',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Jam Mulai</Label>
                <Input
                  id="start-time"
                  type="time"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">Jam Selesai</Label>
                <Input
                  id="end-time"
                  type="time"
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="action-plan">Rencana Aksi</Label>
              <Select>
                <SelectTrigger id="action-plan" className="h-12 text-base">
                  <SelectValue placeholder="Pilih rencana aksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plan-a">
                    Melakukan pemeriksaan pasien
                  </SelectItem>
                  <SelectItem value="plan-b">Mengelola rekam medis</SelectItem>
                  <SelectItem value="plan-c">
                    Asistensi tindakan medis
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Uraian Kegiatan</Label>
              <Textarea
                id="activity"
                placeholder="Contoh: Memeriksa kondisi pasien di kamar 201"
                rows={3}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Keterangan</Label>
              <Textarea
                id="notes"
                placeholder="Contoh: Pasien mengeluh pusing ringan"
                rows={2}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-result">Hasil Kerja (Kuantitas)</Label>
              <Input
                id="work-result"
                type="number"
                placeholder="Contoh: 5"
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proof">Bukti (Opsional)</Label>
              <Button variant="outline" className="w-full h-12 text-base">
                <Upload className="mr-2 h-4 w-4" />
                Unggah Foto atau Laporan
              </Button>
            </div>
            <Button className="w-full h-12 text-lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Simpan Aktivitas
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Aktivitas</CardTitle>
            <CardDescription>
              Daftar aktivitas harian yang telah Anda catat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Rencana Aksi</TableHead>
                  <TableHead>Hasil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDailyActivities.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.actionPlan}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>
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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockDailyActivities.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Belum ada aktivitas yang dicatat.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
