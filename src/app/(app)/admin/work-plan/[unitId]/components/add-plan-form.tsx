
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { WorkPlan } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import { type FormEvent } from 'react';

type AddPlanFormProps = {
  onAddPlan: (plan: Omit<WorkPlan, 'id' | 'unitId'>) => void;
};

export function AddPlanForm({ onAddPlan }: AddPlanFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPlan = {
      program: formData.get('program') as string,
      activities: formData.get('activities') as string,
      target: formData.get('target') as string,
      budget: Number(formData.get('budget')),
    };
    onAddPlan(newPlan);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="program">Nama Program/Kegiatan</Label>
        <Input
          id="program"
          name="program"
          required
          placeholder="Contoh: Program Peningkatan Mutu Pelayanan"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="activities">Rincian Kegiatan</Label>
        <Textarea
          id="activities"
          name="activities"
          required
          rows={3}
          placeholder="Jelaskan rincian kegiatan yang akan dilakukan."
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor="target">Target Kuantitatif</Label>
        <Input
          id="target"
          name="target"
          required
          placeholder="Contoh: Waktu tunggu pasien berkurang 20%"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Anggaran (Rp)</Label>
        <Input
          id="budget"
          name="budget"
          type="number"
          required
          placeholder="Contoh: 150000000"
        />
      </div>
      <Button type="submit">
        <PlusCircle className="mr-2 h-4 w-4" />
        Tambah Rencana
      </Button>
    </form>
  );
}
