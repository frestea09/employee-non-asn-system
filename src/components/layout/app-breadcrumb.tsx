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

const breadcrumbNameMap: { [key: string]: string } = {
  '/admin': 'Admin',
  '/admin/validate-activities': 'Validasi Aktivitas',
  '/admin/validate-performance': 'Validasi Kinerja',
  '/admin/behavioral-assessment': 'Penilaian Perilaku',
  '/dashboard': 'Dashboard',
  '/daily-activity': 'Aktivitas Harian',
  '/monthly-performance': 'Kinerja Bulanan',
  '/attendance': 'Absensi',
  '/reports': 'Laporan',
};


export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Do not show breadcrumb for root dashboard page
  if (pathSegments.length <= 1 || pathname === '/dashboard') {
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
          const name = breadcrumbNameMap[href] || segment;

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
