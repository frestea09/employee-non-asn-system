'use server';

import {
  behavioralAssessment,
  type BehavioralAssessmentInput,
  type BehavioralAssessmentOutput,
} from '@/ai/flows/behavioral-assessment';
import { z } from 'zod';

const formSchema = z.object({
  dailyActivities: z.string().min(10, 'Aktivitas harian harus diisi (minimal 10 karakter).'),
  attendanceRecords: z.string().min(10, 'Catatan kehadiran harus diisi (minimal 10 karakter).'),
});

type FormState = {
  message: string;
  errors: {
    dailyActivities?: string[];
    attendanceRecords?: string[];
  } | null;
  data: BehavioralAssessmentOutput | null;
};

export async function generateAssessmentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    dailyActivities: formData.get('dailyActivities'),
    attendanceRecords: formData.get('attendanceRecords'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Input tidak valid. Mohon periksa kembali data yang Anda masukkan.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await behavioralAssessment(validatedFields.data);
    return {
      message: 'Penilaian berhasil dibuat.',
      errors: null,
      data: result,
    };
  } catch (error) {
    console.error('Error during behavioral assessment:', error);
    return {
      message: 'Terjadi kesalahan saat membuat penilaian. Silakan coba lagi nanti.',
      errors: { dailyActivities: [], attendanceRecords: [] }, // Indicate a general error
      data: null,
    };
  }
}
