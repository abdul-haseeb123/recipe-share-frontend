import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters long",
    })
    .max(40, {
      message: "Email must be at most 40 characters long",
    })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default loginFormSchema;
