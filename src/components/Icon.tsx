import IcoMoonImport from "react-icomoon";
import selection from "../icons/selection.json";
// The CommonJS package's default export is wrapped by Vite but unwrapped by Next.js.
const IcoMoon =
  typeof IcoMoonImport === "function"
    ? IcoMoonImport
    : (IcoMoonImport as unknown as { default: typeof IcoMoonImport }).default;

export function Icon({
  name = "grid",
  size = 20,
}: {
  name?: "grid" | "arrow";
  size?: number;
}) {
  return (
    <IcoMoon iconSet={selection} icon={name} size={size} aria-hidden="true" />
  );
}
