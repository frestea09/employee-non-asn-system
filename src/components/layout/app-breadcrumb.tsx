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
import { mockUsers } from '@/lib/data'; // Import mock data

const breadcrumbNameMap: { [key: string]: string } = {
  '/admin': 'Admin',
  '/admin/validate-activities': 'Validasi Aktivitas',
  '/admin/validate-performance': 'Validasi Kinerja',
  '/admin/user-management': 'Manajemen Pengguna',
  '/admin/unit-management': 'Manajemen Unit',
  '/admin/work-plan': 'Rencana Kerja',
  '/admin/skp-management': 'Manajemen SKP',
  '/dashboard': 'Dashboard',
  '/daily-activity': 'Aktivitas Harian',
  '/monthly-performance': 'Kinerja Bulanan',
  '/attendance': 'Absensi',
  '/reports': 'Laporan',
};

const DynamicBreadcrumbName: React.FC<{ segment: string }> = ({ segment }) => {
  const user = mockUsers.find(u => u.id === segment);
  if (user) {
    return <>{user.name}</>;
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
          const isDynamicId =
            pathSegments[index - 1] === 'skp-management' && !isNaN(Number(segment));

          let name: React.ReactNode = breadcrumbNameMap[href] || segment;

          if (isDynamicId) {
            name = <DynamicBreadcrumbName segment={segment} />;
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
