
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
import type { DailyActivity } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, PlusCircle, Upload } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type ActivityFormProps = {
  onAddActivity: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
  actionPlans: string[];
};

export function ActivityForm({ onAddActivity, actionPlans }: ActivityFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newActivity = {
      date: format(date || new Date(), 'yyyy-MM-dd'),
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: formData.get('action-plan') as string,
      activity: formData.get('activity') as string,
      notes: formData.get('notes') as string,
      quantity: Number(formData.get('work-result')),
      unit: 'Laporan', // Default unit, can be made dynamic later
    };

    onAddActivity(newActivity);
    event.currentTarget.reset();
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
              {date ? format(date, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              locale={id}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-time">Jam Mulai</Label>
          <Input id="start-time" name="start-time" type="time" required className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-time">Jam Selesai</Label>
          <Input id="end-time" name="end-time" type="time" required className="h-12 text-base" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="action-plan">Rencana Aksi</Label>
        <Select name="action-plan" required>
          <SelectTrigger id="action-plan" className="h-12 text-base">
            <SelectValue placeholder="Pilih rencana aksi" />
          </SelectTrigger>
          <SelectContent>
            {actionPlans.map(plan => (
              <SelectItem key={plan} value={plan}>{plan}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="activity">Uraian Kegiatan</Label>
        <Textarea
          id="activity"
          name="activity"
          placeholder="Contoh: Memeriksa kondisi pasien di kamar 201"
          rows={3}
          required
          className="text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Keterangan</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Contoh: Pasien mengeluh pusing ringan"
          rows={2}
          className="text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="work-result">Hasil Kerja (Kuantitas)</Label>
        <Input
          id="work-result"
          name="work-result"
          type="number"
          placeholder="Contoh: 5"
          required
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
