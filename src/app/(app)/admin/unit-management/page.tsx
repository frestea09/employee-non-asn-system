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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockUnits, type Unit } from '@/lib/data';
import { PlusCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { UnitFormDialog } from './components/unit-form-dialog';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function UnitManagementPage() {
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const { toast } = useToast();

  const handleAddUnit = (newUnit: Omit<Unit, 'id'>) => {
    const unitToAdd: Unit = {
      ...newUnit,
      id: (Math.random() * 10000).toString(),
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
                    <Button variant="outline" size="sm" asChild>
                      {/* Tautan ini akan diimplementasikan selanjutnya */}
                      <Link href={`/admin/work-plan/${unit.id}`}>
                        Kelola Unit
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
