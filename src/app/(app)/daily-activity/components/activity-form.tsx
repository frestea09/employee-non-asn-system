'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DailyActivity } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, PlusCircle, Upload } from 'lucide-react';
import type { UserActionPlans } from '../page';
import { useState, type FormEvent } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type ActivityFormProps = {
  actionPlans: UserActionPlans;
  onSave: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
};

export function ActivityForm({ actionPlans, onSave }: ActivityFormProps) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<DailyActivity['category']>('SKP');
  const [activityDate, setActivityDate] = useState<Date | undefined>(new Date());

  const handleSelectChange = (value: string) => {
    const [category, plan] = value.split(':');
    setSelectedPlan(plan);
    setSelectedCategory(category as DailyActivity['category']);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPlan) {
      // Optional: Add a toast notification to tell user to select a plan
      return;
    }

    const formData = new FormData(event.currentTarget);
    const newActivity = {
      date: activityDate ? format(activityDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: selectedPlan,
      category: selectedCategory,
      activity: formData.get('activity') as string,
      notes: formData.get('notes') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
    };
    onSave(newActivity);
    event.currentTarget.reset();
    setSelectedPlan('');
    setActivityDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Tanggal Aktivitas</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !activityDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {activityDate ? (
                format(activityDate, 'PPP', { locale: id })
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={activityDate}
              onSelect={setActivityDate}
              initialFocus
              locale={id}
              disabled={(date) =>
                date > new Date() || date < new Date(new Date().setMonth(new Date().getMonth() -1))
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="action-plan">Pilih Rencana Aksi</Label>
        <Select
          onValueChange={handleSelectChange}
          value={selectedPlan ? `${selectedCategory}:${selectedPlan}` : ''}
        >
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
        <Label htmlFor="activity">Uraian Kegiatan / Tugas</Label>
        <Textarea
          id="activity"
          name="activity"
          placeholder="Contoh: Memeriksa kondisi pasien di kamar 201"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-time">Jam Mulai</Label>
          <Input id="start-time" name="start-time" type="time" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-time">Jam Selesai</Label>
          <Input id="end-time" name="end-time" type="time" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Hasil (Kuantitas)</Label>
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
            placeholder="Contoh: Pasien"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="proof">Bukti (Opsional)</Label>
        <Button variant="outline" className="w-full" type="button">
          <Upload className="mr-2 h-4 w-4" />
          Unggah Foto atau Laporan
        </Button>
      </div>

      <Button type="submit" className="w-full h-12 text-lg">
        <PlusCircle className="mr-2 h-5 w-5" />
        Simpan Aktivitas
      </Button>
    </form>
  );
}
