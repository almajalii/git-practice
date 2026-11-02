import type { NextApiRequest, NextApiResponse } from "next";
import { defineAbility, type Role } from "../../../lib/ability";
import { getPosts } from "../../../lib/posts";
import { postSchema } from "../../../lib/schema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") return res.status(200).json(getPosts());
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ message: "Method not allowed" });
  }
  const role = req.headers["x-demo-role"] as Role;
  if (!defineAbility(role).can("create", "Post"))
    return res
      .status(403)
      .json({ message: "You do not have permission to create posts." });
  try {
    const values = await postSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const post = {
      ...values,
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
    };
    getPosts().unshift(post);
    return res.status(201).json(post);
  } catch {
    return res
      .status(400)
      .json({
        message:
          "Provide a title, category, and at least 20 characters of content.",
      });
  }
}
