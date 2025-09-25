'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ClipboardList,
  AreaChart,
  CalendarCheck,
  FileText,
  ChevronDown,
  CheckCircle,
  Users,
  Briefcase,
  Target,
  Network,
  Shield,
  UserCog,
  ClipboardCheck,
  Building,
  Archive,
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

const validationNav = [
  { href: '/admin/validate-activities', label: 'Aktivitas', icon: <CheckCircle /> },
  { href: '/admin/validate-performance', label: 'Kinerja', icon: <ClipboardList /> },
];

const performanceManagementNav = [
  { href: '/admin/skp-management', label: 'SKP', icon: <Target /> },
  { href: '/admin/work-plan', label: 'Rencana Kerja', icon: <Briefcase /> },
  { href: '/admin/job-standards', label: 'Standar Kinerja', icon: <ClipboardCheck /> },
];

const organizationManagementNav = [
  { href: '/admin/user-management', label: 'Pengguna', icon: <Users /> },
  { href: '/admin/unit-management', label: 'Unit', icon: <Network /> },
  { href: '/admin/position-management', label: 'Jabatan', icon: <UserCog /> },
];

const allAdminHrefs = [
  ...validationNav.map(item => item.href),
  ...performanceManagementNav.map(item => item.href),
  ...organizationManagementNav.map(item => item.href),
];

function AdminSubGroup({ 
  title, 
  icon, 
  navItems, 
  defaultOpen = false 
}: { 
  title: string, 
  icon: React.ReactNode, 
  navItems: {href: string, label: string, icon: React.ReactNode}[],
  defaultOpen?: boolean
}) {
  const pathname = usePathname();
  const isParentActive = (items: {href: string}[]) => items.some(item => pathname.startsWith(item.href));
  const [isOpen, setIsOpen] = useState(defaultOpen || isParentActive(navItems));

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
      <CollapsibleTrigger className='w-full'>
          <div className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-base font-semibold hover:bg-sidebar-accent/50',
                isParentActive(navItems) && 'text-sidebar-accent-foreground'
          )}>
              {icon}
              <span className='flex-1 text-left'>{title}</span>
              <ChevronDown className={cn('ml-auto h-4 w-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />
          </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-8 pr-2 pt-1 pb-2">
           <div className='flex flex-col gap-1 border-l border-border/50 pl-4'>
            {navItems.map(({ href, label, icon }) => (
                <Link href={href} key={href} className={cn(
                  'flex items-center gap-3 rounded-md p-2 text-sm hover:bg-sidebar-accent/50', 
                  pathname.startsWith(href) && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}>
                    {icon}<span>{label}</span>
                </Link>
            ))}
           </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function SidebarNav() {
  const pathname = usePathname();
  
  const isParentActive = (navItems: {href: string}[]) => navItems.some(item => pathname.startsWith(item.href));

  const [isAdminOpen, setIsAdminOpen] = useState(isParentActive(allAdminHrefs));

  return (
    <SidebarMenu className='p-2'>
      {mainNav.map(({ href, label, icon }) => (
        <SidebarMenuItem key={href}>
          <Link href={href}>
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
              isActive={isParentActive(allAdminHrefs)}
              size="lg"
            >
              <div className="flex items-center gap-3">
                <Shield />
                <span>Admin</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform',
                  isAdminOpen && 'rotate-180'
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent>
          <div className="flex flex-col gap-1 py-1 pl-4 pr-2">
              
              <AdminSubGroup 
                title='Validasi' 
                icon={<ClipboardCheck className='h-5 w-5'/>} 
                navItems={validationNav}
              />
              
              <AdminSubGroup 
                title='Manajemen Kinerja' 
                icon={<Archive className='h-5 w-5'/>} 
                navItems={performanceManagementNav}
              />

              <AdminSubGroup 
                title='Manajemen Organisasi' 
                icon={<Building className='h-5 w-5'/>} 
                navItems={organizationManagementNav}
              />

          </div>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenu>
  );
}
