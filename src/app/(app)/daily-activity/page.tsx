'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ActivityForm, type CategorizedActionPlans } from './components/activity-form';
import { ActivityHistory } from './components/activity-history';
import { useState, useMemo } from 'react';
import type { DailyActivity } from '@/lib/data';
import {
  mockDailyActivities,
  mockUsers,
  mockSkpTargets,
  mockWorkPlans,
  mockJobStandards,
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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
  const categorizedActionPlans: CategorizedActionPlans = useMemo(() => {
    const userSkp = mockSkpTargets
      .filter(t => t.userId === currentUser.id)
      .map(t => t.target);

    const userUnitPlans = mockWorkPlans
      .filter(p => p.unitId === currentUser.unitId)
      .map(p => p.program);
      
    const userPositionStandards = mockJobStandards
        .filter(s => s.positionId === currentUser.positionId)
        .map(s => s.standard);

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
      className: 'bg-green-500 text-white',
    });
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
    toast({
      title: 'Dihapus',
      description: 'Aktivitas telah berhasil dihapus.',
      variant: 'destructive',
    });
  };

  const updateActivity = (updatedActivity: DailyActivity) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
     toast({
      title: 'Diperbarui!',
      description: 'Aktivitas telah berhasil diperbarui.',
      className: 'bg-primary text-primary-foreground',
    });
  };

  const handleFilter = () => {
    toast({
      title: 'Filter Diterapkan',
      description: 'Menampilkan aktivitas yang sesuai dengan kriteria Anda.',
    });
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        activity.activity.toLowerCase().includes(searchLower) ||
        activity.actionPlan.toLowerCase().includes(searchLower);

      const matchesDate = selectedDate
        ? activity.date === format(selectedDate, 'yyyy-MM-dd')
        : true;
        
      return matchesSearch && matchesDate;
    });
  }, [activities, searchQuery, selectedDate]);


  return (
     <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
         <Card>
          <CardHeader>
            <CardTitle>Tambah Aktivitas Harian</CardTitle>
            <CardDescription>
              Catat aktivitas yang Anda lakukan hari ini secara terperinci.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityForm onAddActivity={addActivity} actionPlans={categorizedActionPlans} />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Aktivitas</CardTitle>
            <CardDescription>
              Daftar aktivitas harian yang telah Anda catat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityHistory
              activities={filteredActivities}
              onDelete={deleteActivity}
              onUpdate={updateActivity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onFilter={handleFilter}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
