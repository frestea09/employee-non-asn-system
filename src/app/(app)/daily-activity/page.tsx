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
import { ActivityHistory } from './components/activity-history';
import { ActivityForm } from './components/activity-form';
import { EditActivityDialog } from './components/edit-activity-dialog';

export type UserActionPlans = {
  skpTargets: SkpTarget[];
  unitPlans: WorkPlan[];
  jobStandards: JobStandard[];
};

export default function DailyActivityPage() {
  const [activities, setActivities] =
    useState<DailyActivity[]>(mockDailyActivities);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;


  // --- Assume we have a logged in user ---
  const currentUser = mockUsers[0];

  const userActionPlans: UserActionPlans = useMemo(() => {
    const userSkp = mockSkpTargets.filter((t) => t.userId === currentUser.id);
    const userUnitPlans = mockWorkPlans.filter(
      (p) => p.unitId === currentUser.unitId
    );
    const userPositionStandards = mockJobStandards.filter(
      (s) => s.positionId === currentUser.positionId
    );
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
    setActivities((prev) =>
      prev.map((act) => (act.id === updatedActivity.id ? updatedActivity : act))
    );
    toast({
      title: 'Berhasil!',
      description: 'Aktivitas berhasil diperbarui.',
    });
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((act) => act.id !== id));
    toast({
      title: 'Aktivitas Dihapus',
      description: 'Aktivitas telah berhasil dihapus dari riwayat.',
      variant: 'destructive',
    });
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch = activity.activity
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDate =
        !selectedDate ||
        new Date(activity.date).toDateString() === selectedDate.toDateString();
      return matchesSearch && matchesDate;
    });
  }, [activities, searchQuery, selectedDate]);
  
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
           <CardHeader>
            <CardTitle>Input Aktivitas Harian</CardTitle>
            <CardDescription>
              Pilih rencana aksi dan catat aktivitas Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityForm actionPlans={userActionPlans} onSave={addActivity} />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Riwayat Aktivitas</CardTitle>
                <CardDescription>
                  Daftar aktivitas yang telah Anda catat.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ActivityHistory
              activities={paginatedActivities}
              onUpdate={updateActivity}
              onDelete={deleteActivity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onFilter={() => {
                setCurrentPage(1); // Reset to first page on new filter
                toast({ description: 'Filter diterapkan.' });
              }}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
