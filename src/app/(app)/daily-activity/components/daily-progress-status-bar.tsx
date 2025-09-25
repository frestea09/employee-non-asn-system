'use client';

import { Badge } from '@/components/ui/badge';
import type { DailyActivity } from '@/lib/data';
import { Check, Circle } from 'lucide-react';
import { useMemo } from 'react';

type DailyProgressStatusBarProps = {
  activities: DailyActivity[];
};

const StatusPill = ({ label, done }: { label: string; done: boolean }) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors ${
        done
          ? 'border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300'
          : 'border-border bg-muted/50 text-muted-foreground'
      }`}
    >
      {done ? (
        <Check className="h-4 w-4" />
      ) : (
        <Circle className="h-3 w-3 text-muted-foreground/50" />
      )}
      <span className="font-medium">{label}</span>
    </div>
  );
};


export function DailyProgressStatusBar({
  activities,
}: DailyProgressStatusBarProps) {
  const completionStatus = useMemo(() => {
    const categories = new Set(activities.map((act) => act.category));
    return {
      skp: categories.has('SKP'),
      unit: categories.has('Unit'),
      jabatan: categories.has('Jabatan'),
    };
  }, [activities]);

  return (
    <div className="space-y-3 rounded-lg border bg-background/50 p-4">
        <p className="text-sm font-medium text-muted-foreground">Kelengkapan Catatan Hari Ini:</p>
        <div className="flex flex-wrap items-center gap-2">
            <StatusPill label="Target SKP" done={completionStatus.skp} />
            <StatusPill label="Rencana Unit" done={completionStatus.unit} />
            <StatusPill label="Standar Jabatan" done={completionStatus.jabatan} />
        </div>
    </div>
  );
}
