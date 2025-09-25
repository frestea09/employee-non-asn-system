'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useCallback } from 'react';
import {
  DailyActivity,
  UserActionPlans,
  mockDailyActivities,
  mockUsers,
  mockSkpTargets,
  mockWorkPlans,
  mockJobStations,
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { HistoryTab } from './components/history-tab';
import { InputTab } from './components/input-tab';
import { format } from 'date-fns';

export default function DailyActivityPage() {
  const [activities, setActivities] =
    useState<DailyActivity[]>(mockDailyActivities);
  const { toast } = useToast();
  const [activityDate, setActivityDate] = useState(new Date());

  // In a real app, this would come from an auth context
  const currentUser = mockUsers[0];

  const userActionPlans: UserActionPlans = {
    skpTargets: mockSkpTargets.filter((t) => t.userId === currentUser.id),
    unitPlans: mockWorkPlans.filter((p) => p.unitId === currentUser.unitId),
    jobStations: mockJobStations.filter(
      (s) => s.positionId === currentUser.positionId
    ),
  };

  const addActivity = useCallback(
    (newActivity: Omit<DailyActivity, 'id' | 'status'>) => {
      const activityToAdd: DailyActivity = {
        ...newActivity,
        id: `act_${(Math.random() * 10000).toString()}`,
        status: 'Menunggu Validasi',
      };
      setActivities((prev) => [activityToAdd, ...prev]);
      toast({
        title: 'Berhasil!',
        description: 'Aktivitas harian berhasil disimpan.',
      });
    },
    [toast]
  );

  const updateActivity = useCallback(
    (updatedActivity: DailyActivity) => {
      setActivities((prev) =>
        prev.map((act) =>
          act.id === updatedActivity.id ? updatedActivity : act
        )
      );
      toast({
        title: 'Berhasil!',
        description: 'Aktivitas berhasil diperbarui.',
      });
    },
    [toast]
  );

  const deleteActivity = useCallback(
    (id: string) => {
      setActivities((prev) => prev.filter((act) => act.id !== id));
      toast({
        title: 'Aktivitas Dihapus',
        description: 'Aktivitas telah berhasil dihapus dari riwayat.',
        variant: 'destructive',
      });
    },
    [toast]
  );

  const selectedDateString = format(activityDate, 'yyyy-MM-dd');
  const activitiesForSelectedDate = activities.filter(
    (act) => act.date === selectedDateString
  );

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Pengingat Penting</AlertTitle>
        <AlertDescription>
          Batas waktu pencatatan aktivitas adalah tanggal 5 setiap bulannya.
          Pastikan semua aktivitas Anda tercatat sebelum batas waktu.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Aktivitas</TabsTrigger>
          <TabsTrigger value="history">Riwayat Aktivitas</TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle>Input Aktivitas Harian</CardTitle>
              <CardDescription>
                Pilih tanggal, lihat progres, dan catat aktivitas Anda
                berdasarkan rencana kerja.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InputTab
                userActionPlans={userActionPlans}
                onAddActivity={addActivity}
                activityDate={activityDate}
                setActivityDate={setActivityDate}
                activitiesForSelectedDate={activitiesForSelectedDate}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Aktivitas</CardTitle>
              <CardDescription>
                Daftar aktivitas yang telah Anda catat. Anda dapat mencari dan
                memfilter riwayat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HistoryTab
                activities={activities}
                userActionPlans={userActionPlans}
                onUpdateActivity={updateActivity}
                onDeleteActivity={deleteActivity}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
