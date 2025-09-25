import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function BehavioralAssessmentPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Penilaian Perilaku Berbasis AI</CardTitle>
          <CardDescription>
            Fitur ini sedang dalam pengembangan dan akan segera tersedia.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p>Di sini Anda akan dapat menganalisis data aktivitas dan kehadiran untuk mendapatkan wawasan perilaku.</p>
        </CardContent>
      </Card>
    </div>
  );
}
