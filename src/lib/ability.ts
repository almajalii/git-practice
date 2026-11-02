import {
  AbilityBuilder,
  createMongoAbility,
  type MongoAbility,
} from "@casl/ability";
export type Role = "reader" | "editor" | "admin";
export type AppAbility = MongoAbility<
  ["read" | "create" | "update" | "delete" | "manage", "Post" | "all"]
>;
export function defineAbility(role: Role) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
  can("read", "Post");
  if (role === "editor") {
    can("create", "Post");
    can("update", "Post");
  }
  if (role === "admin") can("manage", "all");
  return build();
}
