/** @jest-environment node */
import handler from "../src/pages/api/posts";
import detail from "../src/pages/api/posts/[id]";
import type { NextApiRequest, NextApiResponse } from "next";
function response() {
  const res = { status: jest.fn(), json: jest.fn(), setHeader: jest.fn() };
  res.status.mockReturnValue(res);
  return res;
}
const req = (method: string, role: string, body?: unknown, id?: string) =>
  ({
    method,
    headers: { "x-demo-role": role },
    body,
    query: { id },
  }) as unknown as NextApiRequest;
test("API rejects reader writes and invalid editor input", async () => {
  const denied = response();
  await handler(
    req("POST", "reader", {}),
    denied as unknown as NextApiResponse,
  );
  expect(denied.status).toHaveBeenCalledWith(403);
  const invalid = response();
  await handler(
    req("POST", "editor", {}),
    invalid as unknown as NextApiResponse,
  );
  expect(invalid.status).toHaveBeenCalledWith(400);
});
test("editor creates and updates, only admin can delete", async () => {
  const values = {
    title: "API test post",
    category: "Engineering",
    body: "A sufficiently long story for the validation schema.",
  };
  const created = response();
  await handler(
    req("POST", "editor", values),
    created as unknown as NextApiResponse,
  );
  expect(created.status).toHaveBeenCalledWith(201);
  const post = created.json.mock.calls[0][0];
  const updated = response();
  await detail(
    req("PUT", "editor", { ...values, title: "Updated" }, post.id),
    updated as unknown as NextApiResponse,
  );
  expect(updated.json).toHaveBeenCalledWith(
    expect.objectContaining({ title: "Updated" }),
  );
  const denied = response();
  await detail(
    req("DELETE", "editor", undefined, post.id),
    denied as unknown as NextApiResponse,
  );
  expect(denied.status).toHaveBeenCalledWith(403);
  const removed = response();
  await detail(
    req("DELETE", "admin", undefined, post.id),
    removed as unknown as NextApiResponse,
  );
  expect(removed.status).toHaveBeenCalledWith(200);
  const missing = response();
  await detail(
    req("GET", "reader", undefined, post.id),
    missing as unknown as NextApiResponse,
  );
  expect(missing.status).toHaveBeenCalledWith(404);
});
