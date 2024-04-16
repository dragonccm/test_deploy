import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  dob: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  gender: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  hometown: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(50, { message: "Maximum 1000 caracters." }),
});

