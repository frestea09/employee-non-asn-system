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
  mockJobStations,
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ActivityHistory } from './components/activity-history';
import { ActivityForm } from './components/activity-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { PerformanceProgress } from './components/performance-progress';

export type UserActionPlans = {
  skpTargets: SkpTarget[];
  unitPlans: WorkPlan[];
  jobStations: JobStandard[];
};

export default function DailyActivityPage() {
  const [activities, setActivities] =
    useState<DailyActivity[]>(mockDailyActivities);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // --- Assume we have a logged in user ---
  const currentUser = mockUsers[0];

  const userActionPlans: UserActionPlans = useMemo(() => {
    const userSkp = mockSkpTargets.filter((t) => t.userId === currentUser.id);
    const userUnitPlans = mockWorkPlans.filter(
      (p) => p.unitId === currentUser.unitId
    );
    const userPositionStandards = mockJobStations.filter(
      (s) => s.positionId === currentUser.positionId
    );
    return {
      skpTargets: userSkp,
      unitPlans: userUnitPlans,
      jobStations: userPositionStandards,
    };
  }, [currentUser]);

  const [summaryDate, setSummaryDate] = useState<Date>(new Date());
  
  const activitiesForSummary = useMemo(() => {
    const dateString = summaryDate.toISOString().split('T')[0];
    return activities.filter(act => act.date === dateString);
  }, [activities, summaryDate]);

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
        !filterDate ||
        new Date(activity.date).toDateString() === filterDate.toDateString();
      return matchesSearch && matchesDate;
    });
  }, [activities, searchQuery, filterDate]);
  
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  const isToday = summaryDate.toDateString() === new Date().toDateString();
  const summaryTitle = isToday
    ? "Ringkasan Aktivitas Hari Ini"
    : `Ringkasan untuk ${format(summaryDate, 'PPP', { locale: id })}`;

  return (
    <div className="space-y-6">
       <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Pengingat Penting</AlertTitle>
        <AlertDescription>
          Batas waktu pencatatan aktivitas adalah tanggal 5 setiap bulannya. Pastikan semua aktivitas Anda tercatat sebelum batas waktu.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>{summaryTitle}</CardTitle>
          <CardDescription>
            Pantau kelengkapan pencatatan aktivitas Anda untuk tanggal yang dipilih di setiap kategori.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <PerformanceProgress actionPlans={userActionPlans} activities={activitiesForSummary} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Input Aktivitas Harian</CardTitle>
              <CardDescription>
                Pilih tanggal dan rencana aksi, lalu catat aktivitas Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityForm actionPlans={userActionPlans} onSave={addActivity} onDateChange={setSummaryDate} />
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
                selectedDate={filterDate}
                setSelectedDate={setFilterDate}
                onFilter={() => {
                  setCurrentPage(1); // Reset to first page on new filter
                  toast({ description: 'Filter diterapkan.' });
                }}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                actionPlans={userActionPlans}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
