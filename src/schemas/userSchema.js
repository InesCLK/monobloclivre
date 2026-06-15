import  z  from "zod";

export const registerUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("please enter a valid email address"),
  password: z.string()
  .min(8, 'password must be at least 8 characters')
  .regex(/[A-Z]/, 'password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'password must contain at least one number')
  .regex(/[!@#$%^&*()_+|\-]/, 'password must contain at least one special character'),
});
