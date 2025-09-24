
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { DailyActivity } from '@/lib/data';
import { HistoryFilters } from './history-filters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { EditActivityDialog } from './edit-activity-dialog';

type ActivityHistoryProps = {
  activities: DailyActivity[];
  onDelete: (id: string) => void;
  onUpdate: (activity: DailyActivity) => void;
};

export function ActivityHistory({
  activities,
  onDelete,
  onUpdate,
}: ActivityHistoryProps) {
  const [filteredActivities, setFilteredActivities] =
    useState<DailyActivity[]>(activities);

  // This is a placeholder. In a real app, this would be handled by the filter components.
  useState(() => {
    setFilteredActivities(activities);
  });

  return (
    <div className="space-y-4">
      <HistoryFilters />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Rencana Aksi</TableHead>
              <TableHead>Hasil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length > 0 ? (
              activities.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.actionPlan}</TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'Disetujui'
                          ? 'default'
                          : item.status === 'Ditolak'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={
                        item.status === 'Disetujui'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <EditActivityDialog activity={item} onUpdate={onUpdate}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Buka menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                             <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              asChild
                            >
                               <div className='w-full'> {/* Wrapper div for the dialog trigger */}
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                               </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Hapus</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </EditActivityDialog>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Anda yakin ingin menghapus?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan
                            menghapus aktivitas secara permanen dari riwayat
                            Anda.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(item.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  Belum ada aktivitas yang dicatat atau sesuai filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
