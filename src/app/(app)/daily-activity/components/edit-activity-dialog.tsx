'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { DailyActivity, UserActionPlans } from '@/lib/data';
import { useState, type FormEvent } from 'react';

type EditActivityDialogProps = {
  activity: DailyActivity;
  onUpdate: (activity: DailyActivity) => void;
  children: React.ReactNode;
  actionPlans: UserActionPlans;
};

export function EditActivityDialog({
  activity,
  onUpdate,
  children,
  actionPlans,
}: EditActivityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedPlanValue, setSelectedPlanValue] = useState(`${activity.category}:${activity.actionPlan}`);

  const handleSelectChange = (value: string) => {
    setSelectedPlanValue(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlanValue) return;
    const [category, plan] = selectedPlanValue.split(':');

    const formData = new FormData(event.currentTarget);
    const updatedActivity: DailyActivity = {
      ...activity,
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: plan,
      category: category as DailyActivity['category'],
      activity: formData.get('activity') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
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
          <div className="space-y-2">
            <Label htmlFor="action-plan">Pilih Rencana Aksi</Label>
            <Select onValueChange={handleSelectChange} value={selectedPlanValue}>
              <SelectTrigger id="action-plan">
                <SelectValue placeholder="Pilih tugas dari rencana Anda..." />
              </SelectTrigger>
              <SelectContent>
                {actionPlans.skpTargets.length > 0 && (
                  <SelectGroup>
                    <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                      Target SKP Pribadi
                    </SelectLabel>
                    {actionPlans.skpTargets.map((plan) => (
                      <SelectItem key={plan.id} value={`SKP:${plan.target}`}>
                        {plan.target}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                {actionPlans.unitPlans.length > 0 && (
                  <SelectGroup>
                    <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                      Rencana Kerja Unit
                    </SelectLabel>
                    {actionPlans.unitPlans.map((plan) => (
                      <SelectItem key={plan.id} value={`Unit:${plan.program}`}>
                        {plan.program}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                {actionPlans.jobStations.length > 0 && (
                  <SelectGroup>
                    <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                      Standar Kinerja Jabatan
                    </SelectLabel>
                    {actionPlans.jobStations.map((plan) => (
                      <SelectItem key={plan.id} value={`Jabatan:${plan.standard}`}>
                        {plan.standard}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Hasil Kerja (Kuantitas)</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                defaultValue={activity.quantity}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Satuan</Label>
              <Input
                id="unit"
                name="unit"
                defaultValue={activity.unit}
                required
              />
            </div>
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
