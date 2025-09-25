'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ClipboardList,
  AreaChart,
  CalendarCheck,
  FileText,
  ChevronDown,
  CheckCircle,
  FileCheck,
  Users,
  Briefcase,
  Target,
  Network,
  Shield,
  UserCog,
  ClipboardCheck,
  BrainCircuit,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
  { href: '/admin/user-management', label: 'Manajemen Pengguna', icon: <Users /> },
  { href: '/admin/unit-management', label: 'Manajemen Unit', icon: <Network /> },
  { href: '/admin/position-management', label: 'Manajemen Jabatan', icon: <UserCog /> },
  { href: '/admin/work-plan', label: 'Rencana Kerja', icon: <Briefcase /> },
  { href: '/admin/skp-management', label: 'Manajemen SKP', icon: <Target /> },
  { href: '/admin/job-standards', label: 'Standar Kinerja', icon: <ClipboardCheck /> },
  { href: '/admin/behavioral-assessment', label: 'Analisis Perilaku', icon: <BrainCircuit /> },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [isAdminOpen, setIsAdminOpen] = useState(
    adminNav.some(item => pathname.startsWith(item.href))
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        {mainNav.map(({ href, label, icon }) => (
          <SidebarMenuItem key={href}>
            <Link href={href} passHref legacyBehavior>
              <SidebarMenuButton asChild isActive={pathname === href} tooltip={label} size="lg">
                <div className="flex items-center gap-3">
                  {icon}
                  <span>{label}</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}

        <Collapsible open={isAdminOpen} onOpenChange={setIsAdminOpen}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className="justify-between"
                isActive={adminNav.some(item => pathname.startsWith(item.href))}
                size="lg"
              >
                <div className="flex items-center gap-3">
                  <Shield />
                  <span>Admin</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isAdminOpen && 'rotate-180'
                  )}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
          <CollapsibleContent>
            <div className="flex flex-col gap-1 py-1 pl-8 pr-2">
              {adminNav.map(({ href, label, icon }) => (
                <Link href={href} passHref legacyBehavior key={href}>
                  <a
                    className={cn(
                      'flex items-center gap-3 rounded-md px-2 py-2 text-base hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      pathname.startsWith(href) &&
                        'bg-sidebar-accent text-sidebar-accent-foreground'
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
