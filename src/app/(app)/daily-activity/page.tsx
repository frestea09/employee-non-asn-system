
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
  const [activeTab, setActiveTab] = useState('history');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isFilterActive, setIsFilterActive] = useState(false);

  // --- Assume we have a logged in user ---
  // In a real app, this would come from an auth context.
  const currentUser = mockUsers[0]; 

  // --- Generate dynamic action plans ---
  const actionPlans = useMemo(() => {
    const userSkp = mockSkpTargets
      .filter(t => t.userId === currentUser.id)
      .map(t => t.target);

    const userUnitPlans = mockWorkPlans
      .filter(p => p.unitId === currentUser.unitId) // Assuming user has a unitId
      .map(p => p.program);
      
    const userPositionStandards = mockJobStandards
        .filter(s => s.positionId === currentUser.positionId) // Assuming user has a positionId
        .map(s => s.standard);

    // Combine and remove duplicates
    return [...new Set([...userSkp, ...userUnitPlans, ...userPositionStandards])];
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

  const handleFilter = () => {
    setIsFilterActive(true);
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
            <ActivityForm onAddActivity={addActivity} actionPlans={actionPlans} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
