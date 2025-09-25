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
import { mockUnits, type Unit } from '@/lib/data';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { UnitFormDialog } from './components/unit-form-dialog';
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

export default function UnitManagementPage() {
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const { toast } = useToast();

  const handleAddUnit = (newUnit: Omit<Unit, 'id'>) => {
    const unitToAdd: Unit = {
      ...newUnit,
      id: `unit_${(Math.random() * 10000).toString()}`,
    };
    setUnits((prev) => [unitToAdd, ...prev]);
    toast({
      title: 'Unit Ditambahkan',
      description: `Unit "${unitToAdd.name}" telah berhasil ditambahkan.`,
    });
  };

  const handleUpdateUnit = (updatedUnit: Unit) => {
    setUnits((prev) =>
      prev.map((unit) => (unit.id === updatedUnit.id ? updatedUnit : unit))
    );
    toast({
      title: 'Unit Diperbarui',
      description: `Data untuk unit "${updatedUnit.name}" telah berhasil diperbarui.`,
    });
  };

  const handleDeleteUnit = (unitId: string) => {
    const unitToDelete = units.find((unit) => unit.id === unitId);
    setUnits((prev) => prev.filter((unit) => unit.id !== unitId));
    toast({
      title: 'Unit Dihapus',
      description: `Unit "${unitToDelete?.name}" telah berhasil dihapus.`,
      variant: 'destructive',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manajemen Unit Kerja</CardTitle>
            <CardDescription>
              Kelola unit kerja yang ada di RSUD Otista Soreang.
            </CardDescription>
          </div>
          <UnitFormDialog
            onSave={handleAddUnit}
            triggerButton={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Unit
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Unit</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.name}</TableCell>
                  <TableCell>{unit.description}</TableCell>
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
                          <UnitFormDialog
                            unit={unit}
                            onSave={(updatedUnit) =>
                              handleUpdateUnit(updatedUnit as Unit)
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
                            Anda yakin ingin menghapus unit ini?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Unit bernama{' '}
                            <span className="font-semibold">{unit.name}</span>{' '}
                            akan dihapus secara permanen.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUnit(unit.id)}
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
        </div>
      </CardContent>
    </Card>
  );
}