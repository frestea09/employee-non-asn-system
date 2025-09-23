import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, Calendar, CircleCheckBig } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='space-y-1.5'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Selamat Datang, Karyawan!
        </h1>
        <p className='text-muted-foreground'>
          Berikut ringkasan aktivitas dan kinerja Anda.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Aktivitas Menunggu Validasi
            </CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3</div>
            <p className='text-xs text-muted-foreground'>
              Aktivitas harian yang perlu divalidasi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Realisasi Kinerja Bulan Ini
            </CardTitle>
            <CircleCheckBig className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1</div>
            <p className='text-xs text-muted-foreground'>
              Kinerja bulanan menunggu validasi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Kehadiran
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>20 Hari</div>
            <p className='text-xs text-muted-foreground'>Di bulan Juli 2024</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4 sm:flex-row'>
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>Akses Cepat</CardTitle>
            <CardDescription>
              Lakukan tugas rutin Anda dengan satu klik.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2 sm:flex-row'>
            <Button asChild className='w-full'>
              <Link href='/daily-activity'>Tambah Aktivitas Harian</Link>
            </Button>
            <Button asChild variant='secondary' className='w-full'>
              <Link href='/attendance'>Isi Absensi Hari Ini</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
