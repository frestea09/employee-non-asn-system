'use client';

import { Progress } from '@/components/ui/progress';
import { DailyActivity } from '@/lib/data';
import { useMemo } from 'react';
import { UserActionPlans } from '../page';

type PerformanceProgressProps = {
  actionPlans: UserActionPlans;
  activities: DailyActivity[];
};

export function PerformanceProgress({ actionPlans, activities }: PerformanceProgressProps) {
  const progress = useMemo(() => {
    const { skpTargets, unitPlans, jobStandards } = actionPlans;

    const loggedActionPlans = new Set(activities.map(a => a.actionPlan));

    const calculateProgress = (targets: { target?: string; program?: string; standard?: string }[]) => {
      if (targets.length === 0) return 0;
      const completed = targets.filter(t => {
        const planName = t.target || t.program || t.standard;
        return loggedActionPlans.has(planName!);
      }).length;
      return (completed / targets.length) * 100;
    };

    return {
      skp: calculateProgress(skpTargets),
      unit: calculateProgress(unitPlans),
      job: calculateProgress(jobStandards),
    };
  }, [actionPlans, activities]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Target SKP Pribadi</span>
          <span className="text-muted-foreground">{Math.round(progress.skp)}%</span>
        </div>
        <Progress value={progress.skp} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Rencana Kerja Unit</span>
           <span className="text-muted-foreground">{Math.round(progress.unit)}%</span>
        </div>
        <Progress value={progress.unit} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Standar Kinerja Jabatan</span>
           <span className="text-muted-foreground">{Math.round(progress.job)}%</span>
        </div>
        <Progress value={progress.job} />
      </div>
    </div>
  );
}
