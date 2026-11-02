import { defineAbility } from "../src/lib/ability";
test("readers cannot write; editors cannot delete; admins can delete", () => {
  expect(defineAbility("reader").can("read", "Post")).toBe(true);
  expect(defineAbility("reader").can("create", "Post")).toBe(false);
  expect(defineAbility("editor").can("create", "Post")).toBe(true);
  expect(defineAbility("editor").can("update", "Post")).toBe(true);
  expect(defineAbility("editor").can("delete", "Post")).toBe(false);
  expect(defineAbility("admin").can("delete", "Post")).toBe(true);
});
