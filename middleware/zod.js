import { z } from "zod";

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
});

// const firstNameSchema = z.string()
//   .min(3, "Username must be at least 3 characters")
//   .max(7, "Username must be at most 20 characters")
//   .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");


// export const lastName = z
//   .string()
//   .min(6, { message: "Username must be at least 6 char longs" })
//   .max(7, { message: "Username cannot exceed 20 characters" })
//   .regex(
//     /^[a-z0-9]{6,20}$/,
//     "Username must not contain special characters or uppercase letters"
//   );


// export const emailValidation = z.string().email({ message: "Invalid Email" });
// export const passwordValidation = z
//   .string()
//   .min(8, { message: "Password should have minimum length of 8" })
//   .max(15, "Password is too long")
//   .regex(/^(?=.*[A-Z]).{8,}$/, {
//     message:
//       "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
//   });
// export const signUpSchema = z.object({
//   username: usernameValidation,
//   email: emailValidation,
//   password: passwordValidation,
// });
