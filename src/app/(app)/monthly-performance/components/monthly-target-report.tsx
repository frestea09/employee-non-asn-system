'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { DailyActivity, SkpTarget } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useMemo } from 'react';
import { Send } from 'lucide-react';

type MonthlyTargetReportProps = {
  targets: SkpTarget[];
  activities: DailyActivity[];
};

export function MonthlyTargetReport({
  targets,
  activities,
}: MonthlyTargetReportProps) {
  const { toast } = useToast();

  const accumulatedData = useMemo(() => {
    return targets.map((target) => {
      const relevantActivities = activities.filter(
        (act) => act.actionPlan === target.target && act.category === 'SKP'
      );
      const accumulatedQuantity = relevantActivities.reduce(
        (sum, act) => sum + act.quantity,
        0
      );
      const progress =
        target.monthly_target > 0
          ? (accumulatedQuantity / target.monthly_target) * 100
          : 0;
      return {
        ...target,
        accumulatedQuantity,
        progress,
      };
    });
  }, [targets, activities]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to save the reported values would go here.
    // The data to save is in `accumulatedData`.
    toast({
      title: 'Laporan Diajukan',
      description:
        'Laporan realisasi kinerja bulanan Anda telah berhasil diajukan untuk validasi.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Target Kinerja SKP</TableHead>
              <TableHead className="w-[200px]">Target Bulanan</TableHead>
              <TableHead className="w-[250px]">Realisasi (Otomatis)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accumulatedData.length > 0 ? (
              accumulatedData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">
                    <p>{data.target}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {data.monthly_target} {data.unit}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                       <span className="font-semibold text-lg">
                        {data.accumulatedQuantity} {data.unit}
                      </span>
                      <Progress value={data.progress} />
                      <span className="text-xs text-muted-foreground">
                        {data.progress.toFixed(0)}% dari target tercapai
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-10 text-center text-muted-foreground"
                >
                  Anda belum memiliki Target SKP yang ditetapkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {targets.length > 0 && (
        <div className="flex justify-end">
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Ajukan Laporan Realisasi
          </Button>
        </div>
      )}
    </form>
  );
}
