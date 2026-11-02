export interface Post {
  id: string;
  title: string;
  category: "Design" | "Engineering" | "Product";
  body: string;
  date: string;
}
export const initialPosts: Post[] = [
  {
    id: "designing-with-intent",
    title: "Designing with intent",
    category: "Design",
    body: "Good interfaces make the next step feel obvious. Start with the people using your product, remove unnecessary decisions, and let the details support the work.",
    date: "2026-11-02",
  },
  {
    id: "permission-to-build",
    title: "Permission to build",
    category: "Engineering",
    body: "Authorization belongs at every boundary. CASL lets us describe the rules once and apply them to both the interface and our API.",
    date: "2026-11-01",
  },
  {
    id: "small-things-better",
    title: "Make the small things better",
    category: "Product",
    body: "A thoughtful empty state. A useful validation message. An interaction that feels immediate. Small improvements compound into a better everyday experience.",
    date: "2026-10-30",
  },
];
// Demo data lives in server memory and resets on server restart; use a database in production.
const state = globalThis as typeof globalThis & { demoPosts?: Post[] };
export function getPosts() {
  return (state.demoPosts ??= structuredClone(initialPosts));
}
