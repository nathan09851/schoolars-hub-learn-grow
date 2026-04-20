import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultReviewValues, reviewSchema, type ReviewFormValues } from "@/schemas/review";
import { submitReview } from "@/services/reviews";

interface ReviewFormProps {
  onSuccessCallback?: () => void;
}

const inputClasses =
  "h-12 rounded-2xl border-white/20 bg-white/80 text-slate-900 shadow-sm placeholder:text-slate-500 focus-visible:ring-amber-500";

const textAreaClasses =
  "min-h-28 rounded-2xl border-white/20 bg-white/80 text-slate-900 shadow-sm placeholder:text-slate-500 focus-visible:ring-amber-500";

const ReviewForm = ({ onSuccessCallback }: ReviewFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: defaultReviewValues,
  });

  const [hoverRating, setHoverRating] = useState(0);
  const selectedRating = form.watch("rating") || 1;

  const mutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      form.reset(defaultReviewValues);
      toast.success("Thank you! Your review has been submitted.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to submit your review right now.");
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      <input
        autoComplete="off"
        className="hidden"
        tabIndex={-1}
        type="text"
        {...form.register("honeypot")}
      />

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-900" htmlFor="review-name">
          Your Name
        </Label>
        <Input
          className={inputClasses}
          id="review-name"
          placeholder="Enter your name"
          {...form.register("name")}
        />
        <p className="min-h-5 text-xs text-rose-500">
          {form.formState.errors.name?.message}
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-900">Your Role</Label>
        <div className="flex gap-3">
          {["Student", "Parent", "Other"].map((role) => (
            <label
              key={role}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
                form.watch("role") === role
                  ? "border-amber-400 bg-amber-50 text-amber-700 font-semibold"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                value={role}
                {...form.register("role")}
              />
              {role}
            </label>
          ))}
        </div>
        <p className="min-h-5 text-xs text-rose-500">
          {form.formState.errors.role?.message}
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-900">Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => form.setValue("rating", star)}
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  star <= (hoverRating || selectedRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-100 text-slate-200"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="min-h-5 text-xs text-rose-500">
          {form.formState.errors.rating?.message}
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-900" htmlFor="review-content">
          Your Review
        </Label>
        <Textarea
          className={textAreaClasses}
          id="review-content"
          placeholder="Tell us about your experience..."
          {...form.register("content")}
        />
        <p className="min-h-5 text-xs text-rose-500">
          {form.formState.errors.content?.message}
        </p>
      </div>

      <div className="pt-2">
        <Button
          className="w-full min-h-12 rounded-2xl"
          disabled={mutation.isPending}
          size="lg"
          type="submit"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Post Review"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
