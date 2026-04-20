import * as z from "zod";

export const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  role: z.enum(["Student", "Parent", "Other"], {
    required_error: "Please select a role",
  }),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(10, "Review must be at least 10 characters").max(500, "Review is too long"),
  honeypot: z.string().optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const defaultReviewValues: Partial<ReviewFormValues> = {
  name: "",
  role: undefined,
  rating: 5,
  content: "",
  honeypot: "",
};
