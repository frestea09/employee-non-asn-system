
'use client';

import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUnits, mockWorkPlans, type WorkPlan } from '@/lib/data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AddPlanForm } from './components/add-plan-form';
import { PlanTable } from './components/plan-table';
import { Building2 } from 'lucide-react';

export default function UnitWorkPlanDetailPage() {
  const params = useParams();
  const unitId = params.unitId as string;
  const { toast } = useToast();

  const unit = mockUnits.find((u) => u.id === unitId);
  const [plans, setPlans] = useState<WorkPlan[]>(
    mockWorkPlans.filter((p) => p.unitId === unitId)
  );

  if (!unit) {
    notFound();
  }

  const handleAddPlan = (newPlan: Omit<WorkPlan, 'id' | 'unitId'>) => {
    const planToAdd: WorkPlan = {
      ...newPlan,
      id: `wp_${(Math.random() * 10000).toString()}`,
      unitId: unitId,
    };
    setPlans((prev) => [planToAdd, ...prev]);
    toast({
      title: 'Rencana Ditambahkan',
      description: `Rencana kerja baru telah ditetapkan untuk ${unit.name}.`,
    });
  };

  const handleUpdatePlan = (updatedPlan: WorkPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
     toast({
      title: 'Rencana Diperbarui',
      description: 'Rencana kerja telah berhasil diperbarui.',
    });
  };

  const handleDeletePlan = (planId: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== planId));
    toast({
      title: 'Rencana Dihapus',
      description: 'Rencana kerja telah berhasil dihapus.',
      variant: 'destructive',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rencana Kerja Unit</p>
              <CardTitle className="text-2xl">{unit.name}</CardTitle>
              <CardDescription>{unit.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Tambah Rencana Kerja</CardTitle>
            <CardDescription>Tetapkan program, kegiatan, dan target untuk unit ini.</CardDescription>
        </CardHeader>
        <CardContent>
            <AddPlanForm onAddPlan={handleAddPlan} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Rencana Kerja</CardTitle>
          <CardDescription>
            Rencana kerja yang telah ditetapkan untuk {unit.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlanTable 
            plans={plans}
            onUpdate={handleUpdatePlan}
            onDelete={handleDeletePlan}
          />
        </CardContent>
      </Card>
    </div>
  );
}
