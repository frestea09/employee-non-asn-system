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
import type { DailyActivity, UserActionPlans } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, PlusCircle, Upload, X as XIcon } from 'lucide-react';
import { useState, type FormEvent, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DailyProgressStatusBar } from './daily-progress-status-bar';

type InputTabProps = {
  userActionPlans: UserActionPlans;
  onAddActivity: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
  activityDate: Date;
  setActivityDate: (date: Date) => void;
  activitiesForSelectedDate: DailyActivity[];
};

export function InputTab({ 
    userActionPlans, 
    onAddActivity,
    activityDate,
    setActivityDate,
    activitiesForSelectedDate,
}: InputTabProps) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<DailyActivity['category']>('SKP');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);


  const handleSelectChange = (value: string) => {
    const [category, plan] = value.split(':');
    setSelectedPlan(plan);
    setSelectedCategory(category as DailyActivity['category']);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  const clearFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPlan) {
      // Optional: Add a toast notification to tell user to select a plan
      return;
    }

    const formData = new FormData(event.currentTarget);
    const newActivity = {
      date: format(activityDate, 'yyyy-MM-dd'),
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: selectedPlan,
      category: selectedCategory,
      activity: formData.get('activity') as string,
      notes: formData.get('notes') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      proofUrl: fileName || undefined,
    };
    onAddActivity(newActivity);
    
    if (formRef.current) {
        formRef.current.reset();
        setSelectedPlan('');
        setSelectedCategory('SKP');
        clearFile();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              onSelect={(d) => setActivityDate(d || new Date())}
              initialFocus
              locale={id}
              disabled={(date) =>
                date > new Date() || date < new Date(new Date().setMonth(new Date().getMonth() -1))
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <DailyProgressStatusBar activities={activitiesForSelectedDate} />

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
            {userActionPlans.skpTargets.length > 0 && (
              <SelectGroup>
                <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                  Target SKP Pribadi
                </SelectLabel>
                {userActionPlans.skpTargets.map((plan) => (
                  <SelectItem key={plan.id} value={`SKP:${plan.target}`}>
                    {plan.target}
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
            {userActionPlans.unitPlans.length > 0 && (
              <SelectGroup>
                <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                  Rencana Kerja Unit
                </SelectLabel>
                {userActionPlans.unitPlans.map((plan) => (
                  <SelectItem key={plan.id} value={`Unit:${plan.program}`}>
                    {plan.program}
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
            {userActionPlans.jobStations.length > 0 && (
              <SelectGroup>
                <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                  Standar Kinerja Jabatan
                </SelectLabel>
                {userActionPlans.jobStations.map((plan) => (
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
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        {fileName ? (
          <div className="flex items-center justify-between rounded-md border border-input bg-background p-2">
            <span className="truncate text-sm text-muted-foreground">{fileName}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearFile}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full" type="button" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Unggah Foto atau Laporan
          </Button>
        )}
      </div>

      <Button type="submit" className="w-full h-12 text-lg">
        <PlusCircle className="mr-2 h-5 w-5" />
        Simpan Aktivitas
      </Button>
    </form>
  );
}
