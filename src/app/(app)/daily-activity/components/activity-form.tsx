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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type { DailyActivity } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, PlusCircle, Upload } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export type CategorizedActionPlans = {
  skpTargets: string[];
  unitPlans: string[];
  jobStandards: string[];
};

type ActivityFormProps = {
  onAddActivity: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
  actionPlans: CategorizedActionPlans;
};

type ActivityCategory = 'SKP' | 'Unit' | 'Jabatan';

export function ActivityForm({
  onAddActivity,
  actionPlans,
}: ActivityFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<ActivityCategory>('SKP');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const actionPlan =
      (formData.get('skp-plan') as string) ||
      (formData.get('unit-plan') as string) ||
      (formData.get('job-plan') as string);

    const newActivity = {
      date: format(date || new Date(), 'yyyy-MM-dd'),
      startTime: formData.get('start-time') as string,
      endTime: formData.get('end-time') as string,
      actionPlan: actionPlan,
      activity: formData.get('activity') as string,
      notes: formData.get('notes') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      category: activeTab,
    };

    onAddActivity(newActivity);
    event.currentTarget.reset();
    setDate(new Date());
  };

  const renderPlanSelector = (
    name: string,
    placeholder: string,
    plans: string[]
  ) => (
    <Select name={name} required disabled={plans.length === 0}>
      <SelectTrigger className="h-12 text-base">
        <SelectValue
          placeholder={
            plans.length > 0 ? placeholder : 'Tidak ada rencana yang tersedia'
          }
        />
      </SelectTrigger>
      <SelectContent>
        {plans.map((plan) => (
          <SelectItem key={plan} value={plan}>
            {plan}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as ActivityCategory)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="SKP">Tugas SKP</TabsTrigger>
          <TabsTrigger value="Unit">Tugas Unit</TabsTrigger>
          <TabsTrigger value="Jabatan">Tugas Jabatan</TabsTrigger>
        </TabsList>
        <TabsContent value="SKP" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="skp-plan">Pilih Target SKP Pribadi</Label>
            {renderPlanSelector(
              'skp-plan',
              'Pilih target SKP...',
              actionPlans.skpTargets
            )}
          </div>
        </TabsContent>
        <TabsContent value="Unit" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="unit-plan">Pilih Rencana Kerja Unit</Label>
            {renderPlanSelector(
              'unit-plan',
              'Pilih rencana kerja unit...',
              actionPlans.unitPlans
            )}
          </div>
        </TabsContent>
        <TabsContent value="Jabatan" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="job-plan">Pilih Standar Kinerja Jabatan</Label>
            {renderPlanSelector(
              'job-plan',
              'Pilih standar kinerja...',
              actionPlans.jobStandards
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="activity">Uraian Kegiatan / Tugas</Label>
        <Textarea
          id="activity"
          name="activity"
          placeholder="Contoh: Memeriksa kondisi pasien di kamar 201"
          rows={3}
          required
          className="text-base"
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
                  'w-full justify-start text-left font-normal h-12 text-base',
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-time">Jam Mulai</Label>
            <Input
              id="start-time"
              name="start-time"
              type="time"
              required
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time">Jam Selesai</Label>
            <Input
              id="end-time"
              name="end-time"
              type="time"
              required
              className="h-12 text-base"
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
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
             <Label htmlFor="unit">Satuan</Label>
            <Input
              id="unit"
              name="unit"
              placeholder="Contoh: Laporan, Pasien, Dokumen"
              required
              className="h-12 text-base"
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
          className="text-base"
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
