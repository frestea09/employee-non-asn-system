
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivityForm } from './components/activity-form';
import { ActivityHistory } from './components/activity-history';
import { useState } from 'react';
import type { DailyActivity } from '@/lib/data';
import { mockDailyActivities } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function DailyActivityPage() {
  const [activities, setActivities] =
    useState<DailyActivity[]>(mockDailyActivities);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('history');

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
    setActiveTab('history'); // Switch to history tab after adding
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

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="history">Riwayat Aktivitas</TabsTrigger>
        <TabsTrigger value="add">Tambah Aktivitas</TabsTrigger>
      </TabsList>

      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Aktivitas</CardTitle>
            <CardDescription>
              Daftar aktivitas harian yang telah Anda catat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityHistory
              activities={activities}
              onDelete={deleteActivity}
              onUpdate={updateActivity}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="add">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Aktivitas Harian</CardTitle>
            <CardDescription>
              Catat aktivitas yang Anda lakukan hari ini secara terperinci.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityForm onAddActivity={addActivity} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
