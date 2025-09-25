'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { PerformanceProgress } from './performance-progress';
import type { UserActionPlans, DailyActivity } from '@/lib/data';

type SummaryTabProps = {
  activities: DailyActivity[];
  userActionPlans: UserActionPlans;
};

export function SummaryTab({ activities, userActionPlans }: SummaryTabProps) {
  const [summaryDate, setSummaryDate] = useState<Date>(new Date());

  const activitiesForSummary = useMemo(() => {
     const selectedDateString = format(summaryDate, 'yyyy-MM-dd');
    return activities.filter((act) => act.date === selectedDateString);
  }, [activities, summaryDate]);
  
  const isToday = summaryDate.toDateString() === new Date().toDateString();
  const summaryTitle = isToday
    ? 'Ringkasan Aktivitas Hari Ini'
    : `Ringkasan untuk ${format(summaryDate, 'PPP', { locale: id })}`;


  return (
    <div className='space-y-4'>
        <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
                Pilih tanggal untuk melihat ringkasan
            </p>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={'outline'}
                    className={cn(
                        'w-full sm:w-[280px] justify-start text-left font-normal',
                        !summaryDate && 'text-muted-foreground'
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {summaryDate ? (
                        format(summaryDate, 'PPP', { locale: id })
                    ) : (
                        <span>Pilih tanggal</span>
                    )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={summaryDate}
                    onSelect={(d) => setSummaryDate(d || new Date())}
                    initialFocus
                    locale={id}
                    />
                </PopoverContent>
            </Popover>
        </div>
        <PerformanceProgress
            actionPlans={userActionPlans}
            activities={activitiesForSummary}
        />
    </div>
  );
}
