'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateAssessmentAction } from '../actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <BrainCircuit className="mr-2 h-4 w-4" />
      )}
      {pending ? 'Menganalisis...' : 'Analisis Perilaku'}
    </Button>
  );
}

export function AssessmentForm() {
  const [state, formAction] = useFormState(generateAssessmentAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.data) {
        toast({
          title: state.errors ? 'Gagal' : 'Informasi',
          description: state.message,
          variant: state.errors ? 'destructive' : 'default',
        });
    }
    if (state.data) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div>
      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dailyActivities">Aktivitas Harian</Label>
            <Textarea
              id="dailyActivities"
              name="dailyActivities"
              placeholder="Salin dan tempel log aktivitas harian karyawan di sini..."
              rows={8}
              required
            />
            {state.errors?.dailyActivities && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.dailyActivities[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="attendanceRecords">Catatan Kehadiran</Label>
            <Textarea
              id="attendanceRecords"
              name="attendanceRecords"
              placeholder="Salin dan tempel catatan kehadiran karyawan di sini..."
              rows={8}
              required
            />
            {state.errors?.attendanceRecords && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.attendanceRecords[0]}
              </p>
            )}
          </div>
        </div>
        <SubmitButton />
      </form>

      {state.data && (
        <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">Hasil Penilaian</h2>
                <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                    <CardTitle>Ringkasan Penilaian</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground">{state.data.assessmentSummary}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Area Untuk Peningkatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground">{state.data.areasForImprovement}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Area Penguatan Positif</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground">{state.data.positiveReinforcementAreas}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Saran Tindakan</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground">{state.data.suggestedActions}</p>
                    </CardContent>
                </Card>
                </div>
        </div>
        )}
    </div>
  );
}
