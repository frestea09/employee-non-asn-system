'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { JobStandard } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type AddStandardFormProps = {
  onAddStandard: (standard: Omit<JobStandard, 'id' | 'positionId'>) => void;
};

export function AddStandardForm({ onAddStandard }: AddStandardFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStandard = {
      standard: formData.get('standard') as string,
      description: formData.get('description') as string,
    };
    onAddStandard(newStandard);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="standard">Nama Standar Kinerja</Label>
        <Input
          id="standard"
          name="standard"
          required
          placeholder="Contoh: Ketepatan Waktu Pelaporan"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi / Indikator</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={3}
          placeholder="Jelaskan secara rinci apa yang menjadi ukuran keberhasilan."
        />
      </div>
      <Button type="submit">
        <PlusCircle className="mr-2 h-4 w-4" />
        Tambah Standar
      </Button>
    </form>
  );
}
