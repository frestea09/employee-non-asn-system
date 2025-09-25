
'use client';

import { Progress } from "@/components/ui/progress";
import type { DailyActivity, SkpTarget } from "@/lib/data";

type TargetProgressProps = {
    targets: SkpTarget[];
    activities: DailyActivity[];
};

export function TargetProgress({ targets, activities }: TargetProgressProps) {

    const calculateProgress = (target: SkpTarget) => {
        const relevantActivities = activities.filter(
            (act) => act.category === 'SKP' && act.actionPlan === target.target
        );

        const totalQuantity = relevantActivities.reduce(
            (sum, act) => sum + act.quantity,
            0
        );

        if (target.monthly_target === 0) return { total: totalQuantity, percentage: 100 };

        const percentage = (totalQuantity / target.monthly_target) * 100;
        return { total: totalQuantity, percentage: Math.min(percentage, 100) };
    };

    return (
        <div className="space-y-6">
            {targets.length > 0 ? (
                targets.map((target) => {
                    const { total, percentage } = calculateProgress(target);
                    return (
                        <div key={target.id}>
                            <div className="mb-2 flex items-baseline justify-between">
                                <h4 className="font-semibold">{target.target}</h4>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {total} dari {target.monthly_target} {target.unit}
                                </p>
                            </div>
                            <Progress value={percentage} />
                            <p className="mt-1 text-right text-xs text-muted-foreground">{percentage.toFixed(0)}% Selesai</p>
                        </div>
                    );
                })
            ) : (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    Belum ada target SKP yang ditetapkan untuk Anda.
                </div>
            )}
        </div>
    );
}
