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
  UserCog,
} from 'lucide-react';
import { AppBreadcrumb } from './app-breadcrumb';
import { mockUsers, mockUnits } from '@/lib/data';

const routeConfig: { [key: string]: { title: string; icon: React.ReactNode } } = {
  '/dashboard': { title: 'Dashboard', icon: <LayoutDashboard className="size-5" /> },
  '/daily-activity': { title: 'Aktivitas Harian', icon: <ClipboardList className="size-5" /> },
  '/monthly-performance': { title: 'Kinerja Bulanan', icon: <AreaChart className="size-5" /> },
  '/attendance': { title: 'Absensi', icon: <CalendarCheck className="size-5" /> },
  '/reports': { title: 'Laporan', icon: <FileText className="size-5" /> },
  '/admin/validate-activities': { title: 'Validasi Aktivitas', icon: <CheckCircle className="size-5" /> },
  '/admin/validate-performance': { title: 'Validasi Kinerja', icon: <FileCheck className="size-5" /> },
  '/admin/user-management': { title: 'Manajemen Pengguna', icon: <Users className="size-5" /> },
  '/admin/unit-management': { title: 'Manajemen Unit', icon: <Network className="size-5" /> },
  '/admin/position-management': { title: 'Manajemen Jabatan', icon: <UserCog className="size-5" /> },
  '/admin/work-plan': { title: 'Rencana Kerja Unit', icon: <Briefcase className="size-5" /> },
  '/admin/skp-management': { title: 'Manajemen SKP', icon: <Target className="size-5" /> },
};


function getRouteInfo(pathname: string) {
  // Exact match first
  if (routeConfig[pathname]) {
    return routeConfig[pathname];
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

  // Fallback for admin root or other pages
  if(pathname.startsWith('/admin')) {
      return { title: 'Admin', icon: <Shield className="size-5" /> };
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
