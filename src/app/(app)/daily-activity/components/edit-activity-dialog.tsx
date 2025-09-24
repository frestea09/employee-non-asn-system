
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { DailyActivity } from '@/lib/data';
import { useState, type FormEvent } from 'react';

type EditActivityDialogProps = {
  activity: DailyActivity;
  onUpdate: (activity: DailyActivity) => void;
  children: React.ReactNode;
};

export function EditActivityDialog({
  activity,
  onUpdate,
  children,
}: EditActivityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedActivity: DailyActivity = {
      ...activity,
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: formData.get('action-plan') as string,
      activity: formData.get('activity') as string,
      notes: formData.get('notes') as string,
      quantity: Number(formData.get('work-result')),
    };
    onUpdate(updatedActivity);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Aktivitas Harian</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Jam Mulai</Label>
              <Input
                id="start-time"
                name="start-time"
                type="time"
                defaultValue={activity.startTime}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Jam Selesai</Label>
              <Input
                id="end-time"
                name="end-time"
                type="time"
                defaultValue={activity.endTime}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="action-plan">Rencana Aksi</Label>
            <Select
              name="action-plan"
              defaultValue={activity.actionPlan}
              required
            >
              <SelectTrigger id="action-plan">
                <SelectValue placeholder="Pilih rencana aksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Melakukan pemeriksaan pasien">
                  Melakukan pemeriksaan pasien
                </SelectItem>
                <SelectItem value="Mengelola rekam medis">
                  Mengelola rekam medis
                </SelectItem>
                <SelectItem value="Asistensi tindakan medis">
                  Asistensi tindakan medis
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">Uraian Kegiatan</Label>
            <Textarea
              id="activity"
              name="activity"
              defaultValue={activity.activity}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Keterangan</Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={activity.notes}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-result">Hasil Kerja (Kuantitas)</Label>
            <Input
              id="work-result"
              name="work-result"
              type="number"
              defaultValue={activity.quantity}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

