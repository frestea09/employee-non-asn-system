'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockPositions, type Position } from '@/lib/data';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PositionFormDialog } from './components/position-form-dialog';
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
import { useToast } from '@/hooks/use-toast';

export default function PositionManagementPage() {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const { toast } = useToast();

  const handleAddPosition = (newPosition: Omit<Position, 'id'>) => {
    const positionToAdd: Position = {
      ...newPosition,
      id: (Math.random() * 10000).toString(),
    };
    setPositions((prev) => [positionToAdd, ...prev]);
    toast({
      title: 'Jabatan Ditambahkan',
      description: `Jabatan "${positionToAdd.name}" telah berhasil ditambahkan.`,
    });
  };

  const handleUpdatePosition = (updatedPosition: Position) => {
    setPositions((prev) =>
      prev.map((pos) => (pos.id === updatedPosition.id ? updatedPosition : pos))
    );
    toast({
      title: 'Jabatan Diperbarui',
      description: `Data untuk jabatan "${updatedPosition.name}" telah berhasil diperbarui.`,
    });
  };

  const handleDeletePosition = (positionId: string) => {
    const positionToDelete = positions.find((pos) => pos.id === positionId);
    setPositions((prev) => prev.filter((pos) => pos.id !== positionId));
    toast({
      title: 'Jabatan Dihapus',
      description: `Jabatan "${positionToDelete?.name}" telah berhasil dihapus.`,
      variant: 'destructive',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manajemen Jabatan</CardTitle>
            <CardDescription>
              Kelola jabatan fungsional untuk karyawan non-ASN.
            </CardDescription>
          </div>
          <PositionFormDialog
            onSave={handleAddPosition}
            triggerButton={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Jabatan
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Jabatan</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell className="font-medium">{position.name}</TableCell>
                <TableCell>{position.description}</TableCell>
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
                        <PositionFormDialog
                          position={position}
                          onSave={(updatedPosition) =>
                            handleUpdatePosition(updatedPosition as Position)
                          }
                          triggerButton={
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          }
                        />
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
                          Anda yakin ingin menghapus jabatan ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Jabatan bernama{' '}
                          <span className="font-semibold">{position.name}</span>{' '}
                          akan dihapus secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePosition(position.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Ya, Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
