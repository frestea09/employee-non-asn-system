import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { AppHeader } from '@/components/layout/app-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Briefcase } from 'lucide-react';
import { AppBody } from '@/components/layout/app-body';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className='flex flex-col'>
              <span className="text-lg font-semibold leading-tight tracking-tighter">e-Kinerja</span>
              <span className="text-xs text-muted-foreground">RSUD Soreang</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex w-full items-center justify-between">
             <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback>KA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">Karyawan</span>
                <span className="text-xs text-muted-foreground">karyawan@email.com</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <AppBody>
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </AppBody>
    </SidebarProvider>
  );
}
