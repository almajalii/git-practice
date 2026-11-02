import * as yup from "yup";
export const postSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Give your post a title.")
    .max(100, "Keep the title under 100 characters."),
  category: yup
    .string()
    .oneOf(["Design", "Engineering", "Product"])
    .required("Choose a category."),
  body: yup
    .string()
    .trim()
    .required("Write some content.")
    .min(20, "Write at least 20 characters."),
});
export type PostValues = yup.InferType<typeof postSchema>;
