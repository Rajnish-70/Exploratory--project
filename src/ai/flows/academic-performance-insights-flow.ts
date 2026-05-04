'use server';
/**
 * @fileOverview An AI agent that analyzes student academic performance and attendance
 *               trends to identify at-risk students and suggest pedagogical improvements.
 *
 * - academicPerformanceInsights - A function that handles the academic performance analysis process.
 * - AcademicPerformanceInsightsInput - The input type for the academicPerformanceInsights function.
 * - AcademicPerformanceInsightsOutput - The return type for the academicPerformanceInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicPerformanceInsightsInputSchema = z.object({
  schoolName: z.string().describe('The name of the school.'),
  studentData: z
    .array(
      z.object({
        studentId: z.string().describe('Unique identifier for the student.'),
        studentName: z.string().describe('The full name of the student.'),
        grades: z
          .array(
            z.object({
              subject: z.string().describe('The subject name (e.g., Math, Science).'),
              score: z.number().min(0).max(100).describe('The score received in the subject (0-100).'),
            })
          )
          .describe('An array of subject grades for the student.'),
        attendanceRecords: z
          .array(
            z.object({
              date: z.string().describe('The date of the attendance record (YYYY-MM-DD).'),
              status: z.enum(['present', 'absent']).describe('Attendance status for the day.'),
            })
          )
          .describe('An array of daily attendance records for the student.'),
      })
    )
    .describe('An array of student data, including grades and attendance.'),
});
export type AcademicPerformanceInsightsInput = z.infer<
  typeof AcademicPerformanceInsightsInputSchema
>;

const AcademicPerformanceInsightsOutputSchema = z.object({
  summary: z.string().describe('An overall summary of the academic performance and attendance trends in the school.'),
  atRiskStudents: z
    .array(
      z.object({
        studentId: z.string().describe('Unique identifier of the at-risk student.'),
        studentName: z.string().describe('The name of the at-risk student.'),
        reason: z.string().describe('Concise reason for being identified as at-risk (e.g., "low scores in Math", "high absenteeism").'),
        suggestions: z.string().describe('Specific, actionable suggestions for this student.'),
      })
    )
    .describe('A list of students identified as at-risk, with reasons and specific suggestions.'),
  pedagogicalSuggestions: z
    .string()
    .describe('General pedagogical suggestions for improving overall education quality at the school, based on observed trends.'),
});
export type AcademicPerformanceInsightsOutput = z.infer<
  typeof AcademicPerformanceInsightsOutputSchema
>;

export async function academicPerformanceInsights(
  input: AcademicPerformanceInsightsInput
): Promise<AcademicPerformanceInsightsOutput> {
  return academicPerformanceInsightsFlow(input);
}

const academicPerformanceInsightsPrompt = ai.definePrompt({
  name: 'academicPerformanceInsightsPrompt',
  input: {schema: AcademicPerformanceInsightsInputSchema},
  output: {schema: AcademicPerformanceInsightsOutputSchema},
  prompt: `You are an expert educational analyst specializing in identifying academic risks and suggesting pedagogical improvements for schools.

Analyze the provided student data for {{schoolName}}.

Student Data:
{{#each studentData}}
---
Student ID: {{{studentId}}}
Student Name: {{{studentName}}}
Grades:
  {{#each grades}}
  - Subject: {{{subject}}}, Score: {{{score}}}
  {{/each}}
Attendance Records:
  {{#each attendanceRecords}}
  - Date: {{{date}}}, Status: {{{status}}}
  {{/each}}
---
{{/each}}

Based on this data, identify students who are at risk of falling behind due to academic performance or attendance issues. For each identified student, provide a concise reason and specific, actionable suggestions.

Additionally, provide general pedagogical suggestions for improving overall education quality at {{schoolName}}, considering the trends observed in the student data.

Finally, provide a brief overall summary of the academic performance and attendance trends in the school.

Ensure your output is structured exactly as described in the JSON schema.
`,
});

const academicPerformanceInsightsFlow = ai.defineFlow(
  {
    name: 'academicPerformanceInsightsFlow',
    inputSchema: AcademicPerformanceInsightsInputSchema,
    outputSchema: AcademicPerformanceInsightsOutputSchema,
  },
  async (input) => {
    const {output} = await academicPerformanceInsightsPrompt(input);
    return output!;
  }
);
