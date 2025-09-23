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
            Alat ini menganalisis aktivitas harian dan catatan kehadiran untuk
            memberikan penilaian perilaku awal. Gunakan sebagai panduan, bukan
            sebagai keputusan akhir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
