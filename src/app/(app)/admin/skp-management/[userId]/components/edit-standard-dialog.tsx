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
import type { JobStandard } from '@/lib/data';
import { useState, type FormEvent } from 'react';

type EditStandardDialogProps = {
  standard: JobStandard;
  onUpdate: (standard: JobStandard) => void;
  children: React.ReactNode;
};

export function EditStandardDialog({
  standard,
  onUpdate,
  children,
}: EditStandardDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedStandard: JobStandard = {
      ...standard,
      standard: formData.get('standard') as string,
      description: formData.get('description') as string,
    };
    onUpdate(updatedStandard);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Standar Kinerja</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="standard">Nama Standar Kinerja</Label>
            <Input
              id="standard"
              name="standard"
              defaultValue={standard.standard}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi / Indikator</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={standard.description}
              required
              rows={3}
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
