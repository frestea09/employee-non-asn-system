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
import { Textarea } from '@/components/ui/textarea';
import type { SkpTarget } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type AddTargetFormProps = {
  onAddTarget: (target: Omit<SkpTarget, 'id' | 'positionId'>) => void;
};

export function AddTargetForm({ onAddTarget }: AddTargetFormProps) {
  const [deadline, setDeadline] = useState<Date | undefined>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTarget = {
      target: formData.get('target') as string,
      description: formData.get('description') as string,
      deadline: deadline ? format(deadline, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      monthly_target: Number(formData.get('monthly_target')),
      unit: formData.get('unit') as string,
      status: 'Rencana' as const,
    };
    onAddTarget(newTarget);
    event.currentTarget.reset();
    setDeadline(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="target">Target Kinerja Utama</Label>
        <Input
          id="target"
          name="target"
          required
          placeholder="Contoh: Meningkatkan Kecepatan Respon UGD"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Target</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={3}
          placeholder="Jelaskan secara rinci apa yang harus dicapai."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthly_target">Target Kuantitas Bulanan</Label>
          <Input id="monthly_target" name="monthly_target" type="number" required placeholder="Contoh: 30"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Satuan</Label>
          <Input id="unit" name="unit" required placeholder="Contoh: Pasien"/>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="deadline">Tenggat Waktu</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full sm:w-[280px] justify-start text-left font-normal',
                !deadline && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadline ? (
                format(deadline, 'PPP', { locale: id })
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              initialFocus
              locale={id}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit">
        <PlusCircle className="mr-2 h-4 w-4" />
        Tambah Target
      </Button>
    </form>
  );
}
