'use client';

import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockSkpTargets, mockUsers, type SkpTarget } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { TargetTable } from './components/target-table';
import { AddTargetForm } from './components/add-target-form';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function UserSkpDetailPage() {
  const params = useParams();
  const userId = params.userId as string;
  const { toast } = useToast();

  const user = mockUsers.find((u) => u.id === userId);
  const [targets, setTargets] = useState<SkpTarget[]>(
    mockSkpTargets.filter((t) => t.userId === userId)
  );

  if (!user) {
    notFound();
  }

  const handleAddTarget = (newTarget: Omit<SkpTarget, 'id' | 'userId' | 'status'>) => {
    const targetToAdd: SkpTarget = {
      ...newTarget,
      id: (Math.random() * 10000).toString(),
      userId: userId,
      status: 'Rencana',
    };
    setTargets((prev) => [targetToAdd, ...prev]);
    toast({
      title: 'Target Ditambahkan',
      description: `Target kinerja baru telah ditetapkan untuk ${user.name}.`,
      className: 'bg-green-500 text-white',
    });
  };

  const handleUpdateTarget = (updatedTarget: SkpTarget) => {
    setTargets((prev) =>
      prev.map((t) => (t.id === updatedTarget.id ? updatedTarget : t))
    );
     toast({
      title: 'Target Diperbarui',
      description: 'Target kinerja telah berhasil diperbarui.',
    });
  };

  const handleDeleteTarget = (targetId: string) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    toast({
      title: 'Target Dihapus',
      description: 'Target kinerja telah berhasil dihapus.',
      variant: 'destructive',
    });
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="space-x-2">
                <span>{user.position}</span>
                <span>•</span>
                <span>{user.unit}</span>
                <span>•</span>
                <span className="font-mono">{user.ni}</span>
              </CardDescription>
              <Badge variant="secondary" className="mt-2">
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Tambah Target Kinerja</CardTitle>
            <CardDescription>Tetapkan target kinerja baru untuk periode ini.</CardDescription>
        </CardHeader>
        <CardContent>
            <AddTargetForm onAddTarget={handleAddTarget} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Target Kinerja</CardTitle>
          <CardDescription>
            Target kinerja yang telah ditetapkan untuk {user.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TargetTable 
            targets={targets}
            onUpdate={handleUpdateTarget}
            onDelete={handleDeleteTarget}
          />
        </CardContent>
      </Card>
    </div>
  );
}
