
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { WorkPlan } from '@/lib/data';
import { useState, type FormEvent } from 'react';

type EditPlanDialogProps = {
  plan: WorkPlan;
  onUpdate: (plan: WorkPlan) => void;
  children: React.ReactNode;
};

export function EditPlanDialog({
  plan,
  onUpdate,
  children,
}: EditPlanDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedPlan: WorkPlan = {
      ...plan,
      program: formData.get('program') as string,
      activities: formData.get('activities') as string,
      target: formData.get('target') as string,
      budget: Number(formData.get('budget')),
    };
    onUpdate(updatedPlan);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Rencana Kerja</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="program">Nama Program/Kegiatan</Label>
            <Input
              id="program"
              name="program"
              defaultValue={plan.program}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activities">Rincian Kegiatan</Label>
            <Textarea
              id="activities"
              name="activities"
              defaultValue={plan.activities}
              required
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">Target Kuantitatif</Label>
            <Input
              id="target"
              name="target"
              defaultValue={plan.target}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Anggaran (Rp)</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              defaultValue={plan.budget}
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
