'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { mockUsers, mockUnits } from '@/lib/data';

const breadcrumbNameMap: { [key: string]: string } = {
  '/admin': 'Admin',
  '/admin/validate-activities': 'Validasi Aktivitas',
  '/admin/validate-performance': 'Validasi Kinerja',
  '/admin/user-management': 'Manajemen Pengguna',
  '/admin/unit-management': 'Manajemen Unit',
  '/admin/position-management': 'Manajemen Jabatan',
  '/admin/work-plan': 'Rencana Kerja Unit',
  '/admin/skp-management': 'Manajemen SKP',
  '/dashboard': 'Dashboard',
  '/daily-activity': 'Aktivitas Harian',
  '/monthly-performance': 'Kinerja Bulanan',
  '/attendance': 'Absensi',
  '/reports': 'Laporan',
};

const DynamicBreadcrumbName: React.FC<{ segment: string; context: 'skp' | 'work-plan' }> = ({ segment, context }) => {
  if (context === 'skp') {
    const user = mockUsers.find(u => u.id === segment);
    if (user) return <>{user.name}</>;
  }
  if (context === 'work-plan') {
    const unit = mockUnits.find(u => u.id === segment);
    if (unit) return <>{unit.name}</>;
  }
  return <>{segment}</>;
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  if (pathSegments.length === 0) {
    return null;
  }
  
  const isDashboard = pathSegments.length === 1 && pathSegments[0] === 'dashboard';
  if(isDashboard) {
      return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          let name: React.ReactNode = breadcrumbNameMap[href] || segment;
          let context: 'skp' | 'work-plan' | undefined = undefined;

          if (pathSegments[index - 1] === 'skp-management') {
            context = 'skp';
          } else if (pathSegments[index - 1] === 'work-plan') {
            context = 'work-plan';
          }

          if (context && isLast) {
            name = <DynamicBreadcrumbName segment={segment} context={context} />;
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
