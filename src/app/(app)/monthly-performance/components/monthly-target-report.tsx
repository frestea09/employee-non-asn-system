
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SkpTarget } from '@/lib/data';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type MonthlyTargetReportProps = {
  targets: SkpTarget[];
};

export function MonthlyTargetReport({ targets }: MonthlyTargetReportProps) {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to save the reported values would go here.
    // For this mock, we'll just show a success toast.
    toast({
      title: 'Laporan Disimpan',
      description: 'Realisasi target bulanan Anda telah berhasil disimpan.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Target Kinerja</TableHead>
              <TableHead className="w-[180px]">Target Bulanan</TableHead>
              <TableHead className="w-[200px]">Realisasi Tercapai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targets.length > 0 ? (
              targets.map((target) => (
                <TableRow key={target.id}>
                  <TableCell className="font-medium">
                    <p>{target.target}</p>
                    <p className="text-sm text-muted-foreground">
                      {target.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {target.monthly_target} {target.unit}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        name={`target-${target.id}`}
                        className="max-w-[100px]"
                        placeholder="0"
                        required
                      />
                      <span className="text-sm text-muted-foreground">
                        {target.unit}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-10 text-center text-muted-foreground"
                >
                  Anda belum memiliki Target SKP yang ditetapkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {targets.length > 0 && (
        <div className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Simpan Laporan Realisasi
          </Button>
        </div>
      )}
    </form>
  );
}
