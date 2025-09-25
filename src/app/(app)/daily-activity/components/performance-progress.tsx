'use client';

import { Progress } from '@/components/ui/progress';
import type { DailyActivity } from '@/lib/data';
import { useMemo } from 'react';
import type { UserActionPlans } from '../page';

type PerformanceProgressProps = {
  actionPlans: UserActionPlans;
  activities: DailyActivity[];
};

const ProgressCategory = ({
    title,
    completedCount,
    totalCount
}: {
    title: string;
    completedCount: number;
    totalCount: number;
}) => {
    const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div>
            <div className="mb-2 flex items-baseline justify-between">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm font-medium text-muted-foreground">
                    {completedCount} dari {totalCount} target
                </p>
            </div>
            <Progress value={percentage} />
            <p className="mt-1 text-right text-xs text-muted-foreground">{percentage.toFixed(0)}% Selesai</p>
        </div>
    );
};


export function PerformanceProgress({ actionPlans, activities }: PerformanceProgressProps) {
  
  const progressData = useMemo(() => {
    const loggedSkpTargets = new Set(activities.filter(a => a.category === 'SKP').map(a => a.actionPlan));
    const loggedUnitPlans = new Set(activities.filter(a => a.category === 'Unit').map(a => a.actionPlan));
    const loggedJobStations = new Set(activities.filter(a => a.category === 'Jabatan').map(a => a.actionPlan));

    return {
        skp: {
            completed: loggedSkpTargets.size,
            total: actionPlans.skpTargets.length
        },
        unit: {
            completed: loggedUnitPlans.size,
            total: actionPlans.unitPlans.length
        },
        jabatan: {
            completed: loggedJobStations.size,
            total: actionPlans.jobStations.length
        }
    }
  }, [actionPlans, activities]);

  return (
    <div className="space-y-6">
        <ProgressCategory 
            title="Target SKP Pribadi"
            completedCount={progressData.skp.completed}
            totalCount={progressData.skp.total}
        />
        <ProgressCategory 
            title="Rencana Kerja Unit"
            completedCount={progressData.unit.completed}
            totalCount={progressData.unit.total}
        />
        <ProgressCategory 
            title="Standar Kinerja Jabatan"
            completedCount={progressData.jabatan.completed}
            totalCount={progressData.jabatan.total}
        />
    </div>
  );
}
