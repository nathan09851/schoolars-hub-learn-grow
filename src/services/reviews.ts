import { supabase } from "@/integrations/supabase/client";
import { ReviewFormValues } from "@/schemas/review";

export const fetchReviews = async () => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data;
};

export const submitReview = async (values: ReviewFormValues) => {
  // Anti-spam honeypot
  if (values.honeypot) {
    return;
  }

  const { error } = await supabase.from("reviews").insert({
    name: values.name,
    role: values.role,
    rating: values.rating,
    content: values.content,
    // status is handled by DB default ('approved') or RLS trigger if desired.
  });

  if (error) {
    console.error("Error submitting review:", error);
    throw new Error("Could not submit your review. Please try again later.");
  }
};
