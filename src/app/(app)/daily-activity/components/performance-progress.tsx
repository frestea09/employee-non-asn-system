'use client';

import { Progress } from '@/components/ui/progress';
import type { DailyActivity, UserActionPlans } from '@/lib/data';
import { useMemo } from 'react';

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

    if (totalCount === 0) {
        return null; // Don't render the category if there are no targets
    }

    return (
        <div>
            <div className="mb-2 flex items-baseline justify-between text-sm">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="font-medium text-muted-foreground">
                    {completedCount} dari {totalCount} target
                </p>
            </div>
            <Progress value={percentage} />
            <p className="mt-1 text-right text-xs text-muted-foreground">{percentage.toFixed(0)}% Tercatat</p>
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
    <div className="space-y-4">
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
