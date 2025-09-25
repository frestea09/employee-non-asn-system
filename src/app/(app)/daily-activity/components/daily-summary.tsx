'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Archive, CheckCircle2, ClipboardCheck, Target } from 'lucide-react';

type DailySummaryProps = {
  completionPercentage: number;
  completedCategories: {
    skp: boolean;
    unit: boolean;
    jabatan: boolean;
  };
};

const CategoryIndicator = ({
  icon,
  label,
  isComplete,
}: {
  icon: React.ReactNode;
  label: string;
  isComplete: boolean;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={cn(
        'flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors',
        isComplete && 'bg-accent text-accent-foreground'
      )}
    >
      {isComplete ? <CheckCircle2 className="h-8 w-8" /> : icon}
    </div>
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
  </div>
);

export function DailySummary({
  completionPercentage,
  completedCategories,
}: DailySummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kelengkapan Harian Anda</CardTitle>
        <CardDescription>
          Progress pencatatan aktivitas untuk hari ini di semua kategori.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">
              Progress Hari Ini
            </h4>
            <p className="text-lg font-bold text-primary">
              {completionPercentage.toFixed(0)}%
            </p>
          </div>
          <Progress value={completionPercentage} />
        </div>
        <div className="flex items-start justify-around">
          <CategoryIndicator
            icon={<Target className="h-8 w-8 text-muted-foreground" />}
            label="SKP"
            isComplete={completedCategories.skp}
          />
          <CategoryIndicator
            icon={<Archive className="h-8 w-8 text-muted-foreground" />}
            label="Unit"
            isComplete={completedCategories.unit}
          />
          <CategoryIndicator
            icon={<ClipboardCheck className="h-8 w-8 text-muted-foreground" />}
            label="Jabatan"
            isComplete={completedCategories.jabatan}
          />
        </div>
      </CardContent>
    </Card>
  );
}
