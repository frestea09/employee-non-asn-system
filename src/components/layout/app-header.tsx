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
  Users,
  Briefcase,
  Target,
  Network,
  Shield,
  BrainCircuit,
} from 'lucide-react';
import { AppBreadcrumb } from './app-breadcrumb';
import { mockUsers, mockUnits } from '@/lib/data';

const routeIcons: { [key: string]: React.ReactNode } = {
  '/dashboard': <LayoutDashboard className="size-5" />,
  '/daily-activity': <ClipboardList className="size-5" />,
  '/monthly-performance': <AreaChart className="size-5" />,
  '/attendance': <CalendarCheck className="size-5" />,
  '/reports': <FileText className="size-5" />,
  '/admin': <Shield className="size-5" />,
  '/admin/validate-activities': <CheckCircle className="size-5" />,
  '/admin/validate-performance': <FileCheck className="size-5" />,
  '/admin/user-management': <Users className="size-5" />,
  '/admin/unit-management': <Network className="size-5" />,
  '/admin/work-plan': <Briefcase className="size-5" />,
  '/admin/skp-management': <Target className="size-5" />,
};

const routeTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/daily-activity': 'Aktivitas Harian',
  '/monthly-performance': 'Kinerja Bulanan',
  '/attendance': 'Absensi',
  '/reports': 'Laporan',
  '/admin': 'Admin',
  '/admin/validate-activities': 'Validasi Aktivitas',
  '/admin/validate-performance': 'Validasi Kinerja',
  '/admin/user-management': 'Manajemen Pengguna',
  '/admin/unit-management': 'Manajemen Unit',
  '/admin/work-plan': 'Rencana Kerja Unit',
  '/admin/skp-management': 'Manajemen SKP',
};

function getRouteInfo(pathname: string) {
  // Exact match first
  if (routeTitles[pathname]) {
    return {
      title: routeTitles[pathname],
      icon: routeIcons[pathname],
    };
  }

  // Handle dynamic routes
  const segments = pathname.split('/');
  if (segments.length === 4 && segments[1] === 'admin') {
     if (segments[2] === 'skp-management') {
         const userId = segments[3];
         const user = mockUsers.find(u => u.id === userId);
         const userName = user ? user.name : "Detail Karyawan";
        return {
          title: `SKP: ${userName}`,
          icon: <Target className="size-5" />,
        };
     }
     if (segments[2] === 'work-plan') {
         const unitId = segments[3];
         const unit = mockUnits.find(u => u.id === unitId);
         const unitName = unit ? unit.name : "Detail Unit";
        return {
          title: `Rencana: ${unitName}`,
          icon: <Briefcase className="size-5" />,
        };
     }
  }

  return { title: 'CatatKerja', icon: null };
}

export function AppHeader() {
  const pathname = usePathname();
  const { title, icon } = getRouteInfo(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex flex-col gap-1">
        <AppBreadcrumb />
        <div className="flex items-center gap-2">
            {icon}
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
        </div>
      </div>
    </header>
  );
}
