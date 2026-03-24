import * as z from "zod";

export const ThreadValidation = z.object({
  profile_photo: z.string().url().optional().or(z.literal("")),
  thread: z.string().min(3, { message: "Minimum 3 characters." }).optional().or(z.literal("")),
  accountId: z.string(),
}).refine(
  (data) => data.profile_photo || data.thread,
  {
    message: "You must provide either text content or an image",
    path: ["thread"],
  }
);

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
