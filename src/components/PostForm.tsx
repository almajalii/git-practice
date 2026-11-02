import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@heroui/react";
import { postSchema, type PostValues } from "../lib/schema";
export function PostForm({
  onSubmit,
  initialValues,
  pending = false,
}: {
  onSubmit: (values: PostValues) => Promise<unknown>;
  initialValues?: PostValues;
  pending?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostValues>({
    resolver: yupResolver(postSchema),
    defaultValues: initialValues ?? { title: "", category: "Design", body: "" },
  });
  const input =
    "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-stone-600";
  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="title" className="text-sm font-semibold">
          Post title
        </label>
        <input
          id="title"
          {...register("title")}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          className={input}
          placeholder="A story worth sharing"
        />
        {errors.title && (
          <p
            id="title-error"
            role="alert"
            className="mt-2 text-sm text-red-700"
          >
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="text-sm font-semibold">
          Category
        </label>
        <select id="category" {...register("category")} className={input}>
          <option>Design</option>
          <option>Engineering</option>
          <option>Product</option>
        </select>
        {errors.category && <p role="alert">{errors.category.message}</p>}
      </div>
      <div>
        <label htmlFor="body" className="text-sm font-semibold">
          Your story
        </label>
        <textarea
          id="body"
          {...register("body")}
          aria-invalid={!!errors.body}
          aria-describedby={errors.body ? "body-error" : undefined}
          rows={6}
          className={input}
          placeholder="Share an idea, a lesson, or a fresh perspective…"
        />
        {errors.body && (
          <p id="body-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.body.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        isDisabled={pending || isSubmitting}
        className="w-full bg-[#24291f] text-white"
      >
        {pending || isSubmitting ? "Saving…" : "Save post"}{" "}
        <span aria-hidden>↗</span>
      </Button>
    </form>
  );
}
