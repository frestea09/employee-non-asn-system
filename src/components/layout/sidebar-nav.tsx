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
              <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
                <div className="flex items-center gap-2">
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
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard />
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
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      pathname === href &&
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
