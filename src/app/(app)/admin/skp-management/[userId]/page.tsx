'use client';

import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  mockSkpTargets,
  mockPositions,
  type SkpTarget,
  mockJobStandards,
  JobStandard,
} from '@/lib/data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserCog, Sparkles, AlertTriangle } from 'lucide-react';
import { AddTargetForm } from './components/add-target-form';
import { TargetTable } from './components/target-table';
import { AddStandardForm } from '../../job-standards/[positionId]/components/add-standard-form';
import { StandardTable } from '../../job-standards/[positionId]/components/standard-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PositionPerformanceDetailPage() {
  const params = useParams();
  const positionId = params.userId as string; // It's actually positionId now
  const { toast } = useToast();

  const position = mockPositions.find((p) => p.id === positionId);

  const [targets, setTargets] = useState<SkpTarget[]>(
    mockSkpTargets.filter((t) => t.positionId === positionId)
  );
  const [standards, setStandards] = useState<JobStandard[]>(
    mockJobStandards.filter((s) => s.positionId === positionId)
  );

  if (!position) {
    notFound();
  }

  const handleAddTarget = (
    newTarget: Omit<SkpTarget, 'id' | 'positionId'>
  ) => {
    const targetToAdd: SkpTarget = {
      ...newTarget,
      id: `skp_${(Math.random() * 10000).toString()}`,
      positionId: positionId,
    };
    setTargets((prev) => [targetToAdd, ...prev]);
    toast({
      title: 'Target SKP Ditambahkan',
      description: `Target SKP baru telah dibuat untuk jabatan ${position.name}.`,
    });
  };

  const handleUpdateTarget = (updatedTarget: SkpTarget) => {
    setTargets((prev) =>
      prev.map((t) => (t.id === updatedTarget.id ? updatedTarget : t))
    );
    toast({
      title: 'Target SKP Diperbarui',
      description: 'Target SKP telah berhasil diperbarui.',
    });
  };

  const handleDeleteTarget = (targetId: string) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    toast({
      title: 'Target SKP Dihapus',
      description: 'Target SKP telah berhasil dihapus.',
      variant: 'destructive',
    });
  };

  const handleAddStandard = (
    newStandard: Omit<JobStandard, 'id' | 'positionId'>
  ) => {
    const standardToAdd: JobStandard = {
      ...newStandard,
      id: `js_${(Math.random() * 10000).toString()}`,
      positionId: positionId,
    };
    setStandards((prev) => [standardToAdd, ...prev]);
    toast({
      title: 'Standar Ditambahkan',
      description: `Standar kinerja baru telah ditetapkan untuk ${position.name}.`,
    });
  };

  const handleUpdateStandard = (updatedStandard: JobStandard) => {
    setStandards((prev) =>
      prev.map((s) => (s.id === updatedStandard.id ? updatedStandard : s))
    );
    toast({
      title: 'Standar Diperbarui',
      description: 'Standar kinerja telah berhasil diperbarui.',
    });
  };

  const handleDeleteStandard = (standardId: string) => {
    setStandards((prev) => prev.filter((s) => s.id !== standardId));
    toast({
      title: 'Standar Dihapus',
      description: 'Standar kinerja telah berhasil dihapus.',
      variant: 'destructive',
    });
  };

  const handleBulkApply = () => {
    toast({
      title: 'Proses Diterapkan',
      description: `Target SKP dan Standar Kinerja untuk jabatan ${position.name} sedang diterapkan ke semua karyawan terkait.`,
    });
    // In a real app, this would trigger a backend process.
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <UserCog className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pengaturan Kinerja Jabatan
                </p>
                <CardTitle className="text-2xl">{position.name}</CardTitle>
                <CardDescription>{position.description}</CardDescription>
              </div>
            </div>
            <Button onClick={handleBulkApply}>
              <Sparkles className="mr-2 h-4 w-4" />
              Terapkan ke Karyawan
            </Button>
          </div>
        </CardHeader>
         <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Tindakan Penting</AlertTitle>
            <AlertDescription>
              Setelah mengatur target dan standar, klik tombol <strong>Terapkan ke Karyawan</strong> untuk memberlakukannya bagi semua pemegang jabatan ini.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Target SKP</CardTitle>
            <CardDescription>
              Target kinerja utama yang berlaku untuk jabatan ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AddTargetForm onAddTarget={handleAddTarget} />
              <TargetTable
                targets={targets}
                onUpdate={handleUpdateTarget}
                onDelete={handleDeleteTarget}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Standar Kinerja</CardTitle>
            <CardDescription>
              Standar kinerja dan indikator keberhasilan jabatan ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AddStandardForm onAddStandard={handleAddStandard} />
              <StandardTable
                standards={standards}
                onUpdate={handleUpdateStandard}
                onDelete={handleDeleteStandard}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
