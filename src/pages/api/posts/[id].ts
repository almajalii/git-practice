import type { NextApiRequest, NextApiResponse } from "next";
import { defineAbility, type Role } from "../../../lib/ability";
import { getPosts } from "../../../lib/posts";
import { postSchema } from "../../../lib/schema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === req.query.id);
  if (index < 0) return res.status(404).json({ message: "Post not found" });
  if (req.method === "GET") return res.status(200).json(posts[index]);
  if (req.method !== "PUT" && req.method !== "DELETE") {
    res.setHeader("Allow", "GET, PUT, DELETE");
    return res.status(405).json({ message: "Method not allowed" });
  }
  const action = req.method === "PUT" ? "update" : "delete";
  if (!defineAbility(req.headers["x-demo-role"] as Role).can(action, "Post"))
    return res
      .status(403)
      .json({ message: "You do not have permission to " + action + " posts." });
  if (req.method === "DELETE") {
    posts.splice(index, 1);
    return res.status(200).json({ success: true });
  }
  try {
    const values = await postSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    posts[index] = { ...posts[index], ...values };
    return res.status(200).json(posts[index]);
  } catch {
    return res.status(400).json({ message: "Invalid post. Check all fields." });
  }
}
