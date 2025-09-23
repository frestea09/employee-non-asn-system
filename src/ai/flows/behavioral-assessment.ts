// src/ai/flows/behavioral-assessment.ts
'use server';

/**
 * @fileOverview Analyzes employee daily activities and attendance to provide a preliminary behavioral assessment.
 *
 * - behavioralAssessment - A function that handles the behavioral assessment process.
 * - BehavioralAssessmentInput - The input type for the behavioralAssessment function.
 * - BehavioralAssessmentOutput - The return type for the behavioralAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BehavioralAssessmentInputSchema = z.object({
  dailyActivities: z
    .string()
    .describe('A comprehensive log of the employee\'s daily activities.'),
  attendanceRecords: z
    .string()
    .describe('Detailed attendance records for the employee, including dates and times.'),
});

export type BehavioralAssessmentInput = z.infer<typeof BehavioralAssessmentInputSchema>;

const BehavioralAssessmentOutputSchema = z.object({
  assessmentSummary: z
    .string()
    .describe(
      'A summary of the behavioral assessment, highlighting potential areas of concern or excellence.'
    ),
  areasForImprovement: z
    .string()
    .describe('Specific areas where the employee could improve their behavior or performance.'),
  positiveReinforcementAreas:
    z.string().describe('Areas where the employee has demonstrated positive behavior.'),
  suggestedActions:
    z.string().describe('Suggested actions for the administrator based on the assessment.'),
});

export type BehavioralAssessmentOutput = z.infer<typeof BehavioralAssessmentOutputSchema>;

export async function behavioralAssessment(
  input: BehavioralAssessmentInput
): Promise<BehavioralAssessmentOutput> {
  return behavioralAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'behavioralAssessmentPrompt',
  input: {schema: BehavioralAssessmentInputSchema},
  output: {schema: BehavioralAssessmentOutputSchema},
  prompt: `You are an AI assistant designed to provide preliminary behavioral assessments of employees based on their daily activities and attendance records.

  Analyze the following information to generate an assessment summary, identify areas for improvement, highlight positive behaviors, and suggest actions for the administrator.  Remember this assessment is preliminary and human judgement should always be applied.

  Daily Activities: {{{dailyActivities}}}
  Attendance Records: {{{attendanceRecords}}}

  Focus on identifying patterns, inconsistencies, and notable behaviors that could impact performance.

  Provide a structured assessment that is easy to understand and actionable.
  Remember to be fair and unbiased, and focus on objective data.
  Avoid assumptions or generalizations.
  If there is not sufficient information, indicate what information is lacking and what insights could be gained with it.
  Always consider the context and provide the most accurate assessment possible.
  `, 
});

const behavioralAssessmentFlow = ai.defineFlow(
  {
    name: 'behavioralAssessmentFlow',
    inputSchema: BehavioralAssessmentInputSchema,
    outputSchema: BehavioralAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

