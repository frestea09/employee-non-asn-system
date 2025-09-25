import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AssessmentForm } from './components/assessment-form';

export default function BehavioralAssessmentPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Penilaian Perilaku Berbasis AI</CardTitle>
          <CardDescription>
            Masukkan log aktivitas harian dan catatan kehadiran karyawan untuk
            mendapatkan analisis perilaku awal. AI akan membantu Anda
            mengidentifikasi pola, area untuk perbaikan, dan perilaku positif.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <AssessmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
