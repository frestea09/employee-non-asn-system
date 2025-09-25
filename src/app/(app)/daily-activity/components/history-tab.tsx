'use client';

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
import { MoreHorizontal, Pencil, Trash2, Paperclip } from 'lucide-react';
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
import type { UserActionPlans } from '../page';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

type HistoryTabProps = {
  activities: DailyActivity[];
  userActionPlans: UserActionPlans;
  onUpdateActivity: (activity: DailyActivity) => void;
  onDeleteActivity: (id: string) => void;
};

export function HistoryTab({
  activities,
  userActionPlans,
  onUpdateActivity,
  onDeleteActivity,
}: HistoryTabProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  const getCategoryBadgeVariant = (category: DailyActivity['category']) => {
    switch (category) {
      case 'SKP':
        return 'default';
      case 'Unit':
        return 'secondary';
      case 'Jabatan':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch = activity.activity
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDate =
        !filterDate ||
        new Date(activity.date).toDateString() === filterDate.toDateString();
      return matchesSearch && matchesDate;
    });
  }, [activities, searchQuery, filterDate]);

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <HistoryFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDate={filterDate}
        setSelectedDate={setFilterDate}
        onFilter={() => {
          setCurrentPage(1); // Reset to first page on new filter
          toast({ description: 'Filter diterapkan.' });
        }}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aktivitas</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Hasil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedActivities.length > 0 ? (
              paginatedActivities.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.activity}</p>
                      {item.proofUrl && (
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.actionPlan}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(item.category)}>
                      {item.category}
                    </Badge>
                  </TableCell>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <EditActivityDialog
                            activity={item}
                            onUpdate={onUpdateActivity}
                            actionPlans={userActionPlans}
                          >
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </EditActivityDialog>
                          <DropdownMenuSeparator />
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Hapus</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                            onClick={() => onDeleteActivity(item.id)}
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
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Halaman {currentPage} dari {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
