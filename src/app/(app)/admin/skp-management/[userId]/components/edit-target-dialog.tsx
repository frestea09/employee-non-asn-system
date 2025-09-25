'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Textarea } from '@/components/ui/textarea';
import type { SkpTarget } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState, type FormEvent, useEffect } from 'react';

type EditTargetDialogProps = {
  target: SkpTarget;
  onUpdate: (target: SkpTarget) => void;
  children: React.ReactNode;
};

export function EditTargetDialog({
  target,
  onUpdate,
  children,
}: EditTargetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>();

  useEffect(() => {
    if (isOpen) {
      setDeadline(parseISO(target.deadline));
    }
  }, [isOpen, target.deadline]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedTarget: SkpTarget = {
      ...target,
      target: formData.get('target') as string,
      description: formData.get('description') as string,
      deadline: deadline ? format(deadline, 'yyyy-MM-dd') : target.deadline,
      status: formData.get('status') as SkpTarget['status'],
    };
    onUpdate(updatedTarget);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Target Kinerja</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="target">Target Kinerja Utama</Label>
            <Input
              id="target"
              name="target"
              defaultValue={target.target}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Target</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={target.description}
              required
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Tenggat Waktu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
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
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={target.status} required>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rencana">Rencana</SelectItem>
                <SelectItem value="Realisasi">Realisasi</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
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
