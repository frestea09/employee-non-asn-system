'use client';

import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockJobStandards, mockPositions, type JobStandard } from '@/lib/data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserCog } from 'lucide-react';
import { AddStandardForm } from './components/add-standard-form';
import { StandardTable } from './components/standard-table';

export default function PositionStandardDetailPage() {
  const params = useParams();
  const positionId = params.positionId as string;
  const { toast } = useToast();

  const position = mockPositions.find((p) => p.id === positionId);
  const [standards, setStandards] = useState<JobStandard[]>(
    mockJobStandards.filter((s) => s.positionId === positionId)
  );

  if (!position) {
    notFound();
  }

  const handleAddStandard = (newStandard: Omit<JobStandard, 'id' | 'positionId'>) => {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <UserCog className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Standar Kinerja Jabatan
              </p>
              <CardTitle className="text-2xl">{position.name}</CardTitle>
              <CardDescription>{position.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Standar Kinerja</CardTitle>
          <CardDescription>
            Tetapkan standar kinerja baru untuk jabatan ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddStandardForm onAddStandard={handleAddStandard} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Standar Kinerja</CardTitle>
          <CardDescription>
            Standar kinerja yang telah ditetapkan untuk {position.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StandardTable
            standards={standards}
            onUpdate={handleUpdateStandard}
            onDelete={handleDeleteStandard}
          />
        </CardContent>
      </Card>
    </div>
  );
}
