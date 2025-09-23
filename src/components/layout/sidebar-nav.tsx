'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
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
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const mainNav = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/daily-activity', label: 'Aktivitas Harian', icon: <ClipboardList /> },
  { href: '/monthly-performance', label: 'Kinerja Bulanan', icon: <AreaChart /> },
  { href: '/attendance', label: 'Absensi', icon: <CalendarCheck /> },
  { href: '/reports', label: 'Laporan', icon: <FileText /> },
];

const adminNav = [
  { href: '/admin/validate-activities', label: 'Validasi Aktivitas', icon: <CheckCircle /> },
  { href: '/admin/validate-performance', label: 'Validasi Kinerja', icon: <FileCheck /> },
  { href: '/admin/behavioral-assessment', label: 'Penilaian Perilaku', icon: <BrainCircuit /> },
];

export function SidebarNav() {
  const pathname = usePathname();

  const renderNav = (items: typeof mainNav) =>
    items.map(({ href, label, icon }) => (
      <SidebarMenuItem key={href}>
        <Link href={href} passHref>
          <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
            {icon}
            <span>{label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    ));

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>{renderNav(mainNav)}</SidebarMenu>
      </SidebarGroup>
      <Separator className="my-2" />
      <SidebarGroup>
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        <SidebarMenu>{renderNav(adminNav)}</SidebarMenu>
      </SidebarGroup>
    </>
  );
}
