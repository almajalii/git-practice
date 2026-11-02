import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { AbilityProvider, Can } from "@casl/react";
import { CreateDialog } from "../components/CreateDialog";
import { Layout } from "../components/Layout";
import { Icon } from "../components/Icon";
import { PostForm } from "../components/PostForm";
import { defineAbility } from "../lib/ability";
import { toggleCompact, type RootState } from "../lib/store";
import { loadPosts, postsKey, request, writeHeaders } from "../lib/api";
import type { Post } from "../lib/posts";
import type { PostValues } from "../lib/schema";
export default function Dashboard() {
  const router = useRouter();
  const client = useQueryClient();
  const dispatch = useDispatch();
  const { role, compact } = useSelector((s: RootState) => s.preferences);
  const ability = defineAbility(role);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: posts = [],
    isPending,
    error,
    refetch,
  } = useQuery({ queryKey: postsKey, queryFn: loadPosts });
  const create = useMutation({
    mutationFn: (values: PostValues) =>
      request<Post>("/api/posts", {
        method: "POST",
        headers: writeHeaders(role),
        body: JSON.stringify(values),
      }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: postsKey });
      setCreating(false);
    },
  });
  const category =
    typeof router.query.category === "string"
      ? router.query.category
      : "All posts";
  const filtered = posts.filter(
    (p) =>
      (category === "All posts" || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <AbilityProvider value={ability}>
      <Layout>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium text-stone-500">
              YOUR IDEAS, IN GOOD COMPANY
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              The journal<span className="text-[#88a74e]">.</span>
            </h1>
            <p className="mt-4 text-sm text-stone-500">
              A collection of thoughts, discoveries, and things worth sharing.
            </p>
          </div>
          <Can I="create" a="Post">
            <Button
              onPress={() => {
                create.reset();
                setCreating(true);
              }}
              className="bg-[#24291f] px-5 text-white"
            >
              <span aria-hidden>＋</span> Create a post
            </Button>
          </Can>
        </div>
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-[#dfeacb] px-7 py-9 md:px-10">
          <div className="relative z-10 max-w-md">
            <p className="text-[10px] font-bold tracking-[.2em] text-[#576847]">
              A FRESH PERSPECTIVE
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight">
              Good ideas start
              <br />
              with a little space.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#5f6d50]">
              Write something down. Connect the dots.
              <br />
              Make room for what comes next.
            </p>
            <Link
              href="/guide"
              className="mt-6 inline-flex items-center gap-3 text-xs font-semibold"
            >
              Explore this workspace <Icon name="arrow" size={12} />
            </Link>
          </div>
          <div
            aria-hidden
            className="absolute -right-6 top-4 hidden h-72 w-72 rotate-[-18deg] items-center justify-center rounded-full border-[36px] border-[#b9ce92] sm:flex"
          >
            <div className="h-36 w-36 rounded-full border-[26px] border-[#a4bc7c]" />
          </div>
          <span
            className="absolute right-16 bottom-5 text-6xl text-[#7d9c50]"
            aria-hidden
          >
            ✳
          </span>
        </section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1">
            {["All posts", "Design", "Engineering", "Product"].map((c) => (
              <button
                key={c}
                onClick={() =>
                  void router.push(
                    {
                      pathname: "/",
                      query: c === "All posts" ? {} : { category: c },
                    },
                    undefined,
                    { shallow: true },
                  )
                }
                className={
                  "rounded-full px-4 py-2 text-xs font-medium " +
                  (category === c
                    ? "bg-[#252a21] text-white"
                    : "text-stone-500 hover:bg-stone-200")
                }
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="search">
              Search posts
            </label>
            <input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts…"
              className="w-40 rounded-lg border border-stone-200 bg-transparent px-3 py-2 text-xs"
            />
            <button
              aria-label={
                compact ? "Show spacious cards" : "Show compact cards"
              }
              onClick={() => dispatch(toggleCompact())}
              className="rounded-lg border border-stone-200 p-2"
            >
              <Icon size={15} />
            </button>
          </div>
        </div>
        <p className="mb-5 text-xs text-stone-400">
          {filtered.length} stories in your collection
        </p>
        {isPending && (
          <p role="status" className="py-12 text-stone-500">
            Loading your journal…
          </p>
        )}
        {error && (
          <div role="alert" className="rounded-xl bg-red-50 p-5">
            {error.message}{" "}
            <button onClick={() => void refetch()} className="underline">
              Try again
            </button>
          </div>
        )}
        <div
          className={
            "grid gap-5 " +
            (compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3")
          }
        >
          {filtered.map((post, i) => (
            <Link
              key={post.id}
              href={"/posts/" + post.id}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={
                  "relative flex items-center justify-center overflow-hidden " +
                  (compact ? "h-24" : "h-44") +
                  " " +
                  ["bg-[#e4e7de]", "bg-[#e6dfd4]", "bg-[#dce3e9]"][i % 3]
                }
              >
                <span
                  aria-hidden
                  className={
                    "text-8xl transition duration-500 group-hover:rotate-12 " +
                    ["text-[#9da991]", "text-[#b19a7a]", "text-[#93a5b5]"][
                      i % 3
                    ]
                  }
                >
                  {["✳", "◈", "◒"][i % 3]}
                </span>
                <span className="absolute top-4 left-4 rounded-full bg-white/70 px-3 py-1 text-[9px] font-medium">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-stone-400">
                  {post.date} <span className="mx-2">·</span>{" "}
                  {Math.max(1, Math.ceil(post.body.split(/\s+/).length / 200))}{" "}
                  min read
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-6 text-stone-500">
                  {post.body}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                  <span className="flex items-center gap-2 text-[10px] text-stone-500">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ebe9df] text-[8px]">
                      JD
                    </span>{" "}
                    Jamie Davis
                  </span>
                  <Icon name="arrow" size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!isPending && !error && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center">
            <h2 className="text-lg">A little room for something new.</h2>
            <p className="mt-2 text-sm text-stone-500">
              Try another search or create your first post.
            </p>
          </div>
        )}
        {!ability.can("create", "Post") && (
          <p className="mt-6 text-xs text-stone-500">
            You’re browsing as a reader. Switch to Editor to write your own
            story.
          </p>
        )}
        {creating && ability.can("create", "Post") && (
          <CreateDialog onClose={() => setCreating(false)}>
            <div className="mb-7 flex items-center justify-between">
              <h2 id="create-title" className="text-2xl font-semibold">
                A new perspective.
              </h2>
              <Button
                aria-label="Close form"
                variant="ghost"
                onPress={() => setCreating(false)}
              >
                ✕
              </Button>
            </div>
            <PostForm
              onSubmit={async (v) => {
                try {
                  await create.mutateAsync(v);
                } catch {}
              }}
              pending={create.isPending}
            />
            {create.error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {create.error.message}
              </p>
            )}
          </CreateDialog>
        )}
      </Layout>
    </AbilityProvider>
  );
}
