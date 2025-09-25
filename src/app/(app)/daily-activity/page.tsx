'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useMemo } from 'react';
import type { DailyActivity, JobStandard, SkpTarget, WorkPlan } from '@/lib/data';
import {
  mockDailyActivities,
  mockUsers,
  mockSkpTargets,
  mockWorkPlans,
  mockJobStandards,
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ActivityAccordion } from './components/activity-accordion';
import { ActivityHistory } from './components/activity-history';

export type UserActionPlans = {
  skpTargets: SkpTarget[];
  unitPlans: WorkPlan[];
  jobStandards: JobStandard[];
}

export default function DailyActivityPage() {
  const [activities, setActivities] =
    useState<DailyActivity[]>(mockDailyActivities);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // --- Assume we have a logged in user ---
  // In a real app, this would come from an auth context.
  const currentUser = mockUsers[0]; 

  // --- Generate dynamic action plans, but keep them categorized ---
  const userActionPlans: UserActionPlans = useMemo(() => {
    const userSkp = mockSkpTargets
      .filter(t => t.userId === currentUser.id);

    const userUnitPlans = mockWorkPlans
      .filter(p => p.unitId === currentUser.unitId);
      
    const userPositionStandards = mockJobStandards
        .filter(s => s.positionId === currentUser.positionId);

    return {
        skpTargets: userSkp,
        unitPlans: userUnitPlans,
        jobStandards: userPositionStandards,
    };
  }, [currentUser]);


  const addActivity = (newActivity: Omit<DailyActivity, 'id' | 'status'>) => {
    const activityToAdd: DailyActivity = {
      ...newActivity,
      id: (Math.random() * 10000).toString(),
      status: 'Menunggu Validasi',
    };
    setActivities((prev) => [activityToAdd, ...prev]);
    toast({
      title: 'Berhasil!',
      description: 'Aktivitas harian berhasil disimpan.',
    });
  };

  const updateActivity = (updatedActivity: DailyActivity) => {
    setActivities(prev => prev.map(act => act.id === updatedActivity.id ? updatedActivity : act));
    toast({
        title: 'Berhasil!',
        description: 'Aktivitas berhasil diperbarui.',
    });
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(act => act.id !== id));
    toast({
        title: 'Aktivitas Dihapus',
        description: 'Aktivitas telah berhasil dihapus dari riwayat.',
        variant: 'destructive'
    });
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
        const matchesSearch = activity.activity.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDate = !selectedDate || new Date(activity.date).toDateString() === selectedDate.toDateString();
        return matchesSearch && matchesDate;
    });
  }, [activities, searchQuery, selectedDate]);
  
  return (
     <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Catat Aktivitas Harian</CardTitle>
          <CardDescription>
            Pilih salah satu tugas dari daftar di bawah, lalu catat detail aktivitas yang Anda lakukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ActivityAccordion 
                actionPlans={userActionPlans} 
                onLogActivity={addActivity} 
            />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Riwayat Aktivitas</CardTitle>
            <CardDescription>Daftar aktivitas yang telah Anda catat.</CardDescription>
        </CardHeader>
        <CardContent>
            <ActivityHistory 
                activities={filteredActivities}
                onUpdate={updateActivity}
                onDelete={deleteActivity}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onFilter={() => {
                    // The filtering is already reactive via useMemo, 
                    // but we can keep the button for user clarity.
                    toast({ description: 'Filter diterapkan.' });
                }}
            />
        </CardContent>
      </Card>
    </div>
  );
}
