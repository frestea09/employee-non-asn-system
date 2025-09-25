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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { SkpTarget } from '@/lib/data';
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
import { EditTargetDialog } from './edit-target-dialog';

type TargetTableProps = {
  targets: SkpTarget[];
  onDelete: (id: string) => void;
  onUpdate: (target: SkpTarget) => void;
};

export function TargetTable({
  targets,
  onDelete,
  onUpdate,
}: TargetTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Target Kinerja</TableHead>
            <TableHead>Tenggat</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {targets.length > 0 ? (
            targets.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                    <p className="font-medium">{item.target}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </TableCell>
                <TableCell>{item.deadline}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === 'Selesai'
                        ? 'default'
                        : item.status === 'Realisasi'
                        ? 'secondary'
                        : 'outline'
                    }
                    className={
                      item.status === 'Selesai'
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
                         <EditTargetDialog target={item} onUpdate={onUpdate}>
                           <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                           </DropdownMenuItem>
                         </EditTargetDialog>
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
                          menghapus target kinerja secara permanen.
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
                colSpan={4}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                Belum ada target kinerja yang ditetapkan untuk karyawan ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
