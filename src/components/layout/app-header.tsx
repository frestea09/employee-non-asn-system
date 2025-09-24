'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  AreaChart,
  CalendarCheck,
  FileText,
  CheckCircle,
  FileCheck,
  BrainCircuit,
} from 'lucide-react';
import { AppBreadcrumb } from './app-breadcrumb';

const routeTitles: { [key: string]: { title: string; icon: React.ReactNode } } = {
  '/dashboard': { title: 'Dashboard', icon: <LayoutDashboard className="size-5" /> },
  '/daily-activity': { title: 'Aktivitas Harian', icon: <ClipboardList className="size-5" /> },
  '/monthly-performance': { title: 'Kinerja Bulanan', icon: <AreaChart className="size-5" /> },
  '/attendance': { title: 'Absensi', icon: <CalendarCheck className="size-5" /> },
  '/reports': { title: 'Laporan', icon: <FileText className="size-5" /> },
  '/admin/validate-activities': { title: 'Validasi Aktivitas', icon: <CheckCircle className="size-5" /> },
  '/admin/validate-performance': { title: 'Validasi Kinerja', icon: <FileCheck className="size-5" /> },
  '/admin/behavioral-assessment': { title: 'Penilaian Perilaku', icon: <BrainCircuit className="size-5" /> },
};

export function AppHeader() {
  const pathname = usePathname();
  const { title, icon } = routeTitles[pathname] ?? { title: 'CatatKerja', icon: null };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex flex-col gap-1">
        <AppBreadcrumb />
        <div className="flex items-center gap-2">
            {icon}
            <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
        </div>
      </div>
    </header>
  );
}
