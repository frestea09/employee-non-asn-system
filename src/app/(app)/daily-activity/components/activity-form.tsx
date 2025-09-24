'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircle, Upload } from 'lucide-react';
import { useState } from 'react';

export function ActivityForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <form className="space-y-4">
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
          <PopoverContent className="w-auto p-0" align="start">
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
          <Input id="start-time" type="time" className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-time">Jam Selesai</Label>
          <Input id="end-time" type="time" className="h-12 text-base" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="action-plan">Rencana Aksi</Label>
        <Select>
          <SelectTrigger id="action-plan" className="h-12 text-base">
            <SelectValue placeholder="Pilih rencana aksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plan-a">Melakukan pemeriksaan pasien</SelectItem>
            <SelectItem value="plan-b">Mengelola rekam medis</SelectItem>
            <SelectItem value="plan-c">Asistensi tindakan medis</SelectItem>
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
        <Button
          variant="outline"
          className="w-full h-12 text-base"
          type="button"
        >
          <Upload className="mr-2 h-4 w-4" />
          Unggah Foto atau Laporan
        </Button>
      </div>
      <Button className="w-full h-12 text-lg" type="submit">
        <PlusCircle className="mr-2 h-4 w-4" />
        Simpan Aktivitas
      </Button>
    </form>
  );
}
