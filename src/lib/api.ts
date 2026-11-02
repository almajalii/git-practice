import type { Post } from "./posts";
import type { Role } from "./ability";
export async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }
  return response.json();
}
export const postsKey = ["posts"] as const;
export const loadPosts = () => request<Post[]>("/api/posts");
// This header is a deliberately selectable DEMO identity, not production authentication.
export const writeHeaders = (role: Role) => ({
  "Content-Type": "application/json",
  "x-demo-role": role,
});
