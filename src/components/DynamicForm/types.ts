import { z } from 'zod';

export const PersonalInfoFormSchema = z.object({
  name: z.string().min(2, 'Name must contain at least 2 characters'),
  surname: z.string().min(2, 'Surname must contain at least 2 characters'),
  interests: z.object({ name: z.string().min(2, 'Interest must contain at least 2 characters') }).array(),
});

export type PersonalInfoForm = z.infer<typeof PersonalInfoFormSchema>;
