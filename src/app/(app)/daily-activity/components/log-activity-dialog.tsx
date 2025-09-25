'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { DailyActivity } from '@/lib/data';
import { useState, type FormEvent } from 'react';
import { CalendarIcon, Upload } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';


type LogActivityDialogProps = {
  actionPlan: string;
  category: DailyActivity['category'];
  onSave: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
  children: React.ReactNode;
};

export function LogActivityDialog({
  actionPlan,
  category,
  onSave,
  children,
}: LogActivityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newActivity = {
      date: format(date || new Date(), 'yyyy-MM-dd'),
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: actionPlan,
      activity: formData.get('activity') as string,
      notes: formData.get('notes') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      category: category,
    };

    onSave(newActivity);
    setIsOpen(false);
    setDate(new Date());
    event.currentTarget.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Catat Aktivitas: {actionPlan}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
             <div className="space-y-2">
                <Label htmlFor="activity">Uraian Kegiatan / Tugas</Label>
                <Textarea
                id="activity"
                name="activity"
                placeholder="Contoh: Memeriksa kondisi pasien di kamar 201"
                rows={3}
                required
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                <Label htmlFor="date">Tanggal Pelaksanaan</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                        format(date, 'PPP', { locale: id })
                        ) : (
                        <span>Pilih tanggal</span>
                        )}
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
                <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <Label htmlFor="start-time">Jam Mulai</Label>
                    <Input
                    id="start-time"
                    name="start-time"
                    type="time"
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="end-time">Jam Selesai</Label>
                    <Input
                    id="end-time"
                    name="end-time"
                    type="time"
                    required
                    />
                </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="quantity">Hasil Kerja (Kuantitas)</Label>
                    <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Contoh: 5"
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="unit">Satuan</Label>
                    <Input
                    id="unit"
                    name="unit"
                    placeholder="Contoh: Laporan, Pasien, Dokumen"
                    required
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="notes">Keterangan Tambahan (Opsional)</Label>
                <Textarea
                id="notes"
                name="notes"
                placeholder="Contoh: Pasien mengeluh pusing ringan"
                rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="proof">Bukti (Opsional)</Label>
                <Button
                variant="outline"
                className="w-full"
                type="button"
                >
                <Upload className="mr-2 h-4 w-4" />
                Unggah Foto atau Laporan
                </Button>
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Simpan Aktivitas</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
