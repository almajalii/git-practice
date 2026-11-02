import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { Layout } from "../../components/Layout";
import { PostForm } from "../../components/PostForm";
import { defineAbility } from "../../lib/ability";
import type { RootState } from "../../lib/store";
import type { Post } from "../../lib/posts";
import type { PostValues } from "../../lib/schema";
import { request, writeHeaders, postsKey } from "../../lib/api";
export default function PostPage() {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : "";
  const role = useSelector((s: RootState) => s.preferences.role);
  const ability = defineAbility(role);
  const client = useQueryClient();
  const [editing, setEditing] = useState(false);
  const {
    data: post,
    error,
    isPending,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => request<Post>("/api/posts/" + id),
    enabled: router.isReady && !!id,
  });
  const save = useMutation({
    mutationFn: (values: PostValues) =>
      request<Post>("/api/posts/" + id, {
        method: "PUT",
        headers: writeHeaders(role),
        body: JSON.stringify(values),
      }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ["post", id] }),
        client.invalidateQueries({ queryKey: postsKey }),
      ]);
      setEditing(false);
    },
  });
  const remove = useMutation({
    mutationFn: () =>
      request("/api/posts/" + id, {
        method: "DELETE",
        headers: writeHeaders(role),
      }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: postsKey });
      await router.push("/");
    },
  });
  return (
    <Layout>
      <Link href="/" className="text-sm text-stone-500">
        ← Back to the journal
      </Link>
      {isPending ? (
        <p role="status" className="mt-10">
          Loading story…
        </p>
      ) : error ? (
        <p role="alert" className="mt-10 text-red-700">
          {error.message}
        </p>
      ) : (
        post && (
          <article className="mx-auto mt-10 max-w-2xl">
            <span className="rounded-full bg-[#dfeacb] px-4 py-2 text-xs">
              {post.category}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-xs text-stone-400">
              Jamie Davis · {post.date}
            </p>
            <div className="my-8 flex gap-3">
              {ability.can("update", "Post") && (
                <Button
                  variant="secondary"
                  onPress={() => setEditing(!editing)}
                >
                  {editing ? "Cancel editing" : "Edit post"}
                </Button>
              )}
              {ability.can("delete", "Post") && (
                <Button
                  variant="danger"
                  isDisabled={remove.isPending}
                  onPress={() => {
                    if (window.confirm("Delete this post?")) remove.mutate();
                  }}
                >
                  Delete post
                </Button>
              )}
            </div>
            {editing && ability.can("update", "Post") ? (
              <PostForm
                initialValues={post}
                pending={save.isPending}
                onSubmit={async (v) => {
                  try {
                    await save.mutateAsync(v);
                  } catch {}
                }}
              />
            ) : (
              <p className="whitespace-pre-wrap text-lg leading-9 text-stone-600">
                {post.body}
              </p>
            )}
            {(save.error || remove.error) && (
              <p role="alert" className="mt-4 text-red-700">
                {(save.error || remove.error)?.message}
              </p>
            )}
          </article>
        )
      )}
    </Layout>
  );
}
