'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DailyActivity } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { ActivityAccordion } from './activity-accordion';
import type { UserActionPlans } from '../page';

type AddActivityDialogProps = {
  actionPlans: UserActionPlans;
  onLogActivity: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
};

export function AddActivityDialog({ actionPlans, onLogActivity }: AddActivityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Wrapper function to close dialog after logging
  const handleLogAndClose = (activity: Omit<DailyActivity, 'id' | 'status'>) => {
    onLogActivity(activity);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Aktivitas Harian
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Catat Aktivitas Harian</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ActivityAccordion
            actionPlans={actionPlans}
            onLogActivity={handleLogAndClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
