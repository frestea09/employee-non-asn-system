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

export default function DailyActivityPage() {
  return (
    <Tabs defaultValue="history" className="space-y-4">
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
            <ActivityHistory />
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
            <ActivityForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
