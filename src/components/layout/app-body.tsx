'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

export const AppBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  return (
    <div
      ref={ref}
      data-sidebar-state={state}
      className={cn(
        'flex min-h-svh flex-1 flex-col bg-background transition-[margin-left] duration-300 ease-in-out md:ml-[var(--sidebar-width)]',
        'data-[sidebar-state=collapsed]:md:ml-[var(--sidebar-width-icon)]',
        className
      )}
      {...props}
    />
  );
});
AppBody.displayName = 'AppBody';
