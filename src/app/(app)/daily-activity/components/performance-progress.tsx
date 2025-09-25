'use client';

import { Progress } from '@/components/ui/progress';
import type { DailyActivity, JobStandard, SkpTarget, UserActionPlans, WorkPlan } from '@/lib/data';
import { useMemo } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type PerformanceProgressProps = {
  actionPlans: UserActionPlans;
  activities: DailyActivity[];
};

type TargetItem = SkpTarget | WorkPlan | JobStandard;

const getTargetName = (item: TargetItem): string => {
  if ('target' in item) return item.target;
  if ('program' in item) return item.program;
  if ('standard' in item) return item.standard;
  return '';
}

const ProgressCategory = ({
  title,
  completedCount,
  totalCount,
  targets,
  loggedActionPlans,
}: {
  title: string;
  completedCount: number;
  totalCount: number;
  targets: TargetItem[];
  loggedActionPlans: Set<string>;
}) => {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (totalCount === 0) {
    return null; // Don't render the category if there are no targets
  }

  return (
    <div>
      <Accordion type="single" collapsible defaultValue='item-1'>
        <AccordionItem value="item-1" className='border-none'>
          <AccordionTrigger className='py-2 hover:no-underline'>
            <div className="w-full">
              <div className="mb-2 flex items-baseline justify-between text-sm">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="font-medium text-muted-foreground">
                  {completedCount} dari {totalCount} target
                </p>
              </div>
              <Progress value={percentage} />
              <p className="mt-1 text-right text-xs text-muted-foreground">{percentage.toFixed(0)}% Tercatat</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className='pt-2'>
            <div className="space-y-2 pl-2">
              {targets.map((target) => {
                const targetName = getTargetName(target);
                const isCompleted = loggedActionPlans.has(targetName);
                return (
                  <div key={target.id} className="flex items-center gap-3 text-sm">
                    {isCompleted ? (
                       <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-foreground" />
                    ) : (
                       <Circle className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                    )}
                    <span className={cn('flex-1', isCompleted ? 'text-muted-foreground line-through' : 'text-foreground')}>
                        {targetName}
                    </span>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};


export function PerformanceProgress({ actionPlans, activities }: PerformanceProgressProps) {
  const progressData = useMemo(() => {
    const loggedActionPlans = new Set(activities.map((a) => a.actionPlan));

    const loggedSkpTargets = new Set(
      activities.filter((a) => a.category === 'SKP').map((a) => a.actionPlan)
    );
    const loggedUnitPlans = new Set(
      activities.filter((a) => a.category === 'Unit').map((a) => a.actionPlan)
    );
    const loggedJobStations = new Set(
      activities.filter((a) => a.category === 'Jabatan').map((a) => a.actionPlan)
    );

    return {
      loggedActionPlans,
      skp: {
        completed: loggedSkpTargets.size,
        total: actionPlans.skpTargets.length,
      },
      unit: {
        completed: loggedUnitPlans.size,
        total: actionPlans.unitPlans.length,
      },
      jabatan: {
        completed: loggedJobStations.size,
        total: actionPlans.jobStations.length,
      },
    };
  }, [actionPlans, activities]);

  return (
    <div className="space-y-1">
      <ProgressCategory
        title="Target SKP Pribadi"
        completedCount={progressData.skp.completed}
        totalCount={progressData.skp.total}
        targets={actionPlans.skpTargets}
        loggedActionPlans={progressData.loggedActionPlans}
      />
      <ProgressCategory
        title="Rencana Kerja Unit"
        completedCount={progressData.unit.completed}
        totalCount={progressData.unit.total}
        targets={actionPlans.unitPlans}
        loggedActionPlans={progressData.loggedActionPlans}
      />
      <ProgressCategory
        title="Standar Kinerja Jabatan"
        completedCount={progressData.jabatan.completed}
        totalCount={progressData.jabatan.total}
        targets={actionPlans.jobStations}
        loggedActionPlans={progressData.loggedActionPlans}
      />
    </div>
  );
}
