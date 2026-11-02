import { Layout } from "../components/Layout";
const examples = [
  [
    "CASL 7",
    "src/lib/ability.ts",
    "Reader can read; Editor can create and update; Admin can also delete. The same rules are checked in API handlers.",
  ],
  [
    "Pages Router / useRouter",
    "src/pages/index.tsx",
    "Category filters use shallow routing and ?category=Design. Post links open the dynamic /posts/[id] route.",
  ],
  [
    "HeroUI 3 + Tailwind 4",
    "src/components/PostForm.tsx",
    "HeroUI buttons provide accessible interactions; Tailwind utilities and HeroUI styles shape the interface.",
  ],
  [
    "React Hook Form + Yup",
    "src/lib/schema.ts",
    "Create and edit forms share a validated schema with the API. Try an empty title or a short story.",
  ],
  [
    "Redux Toolkit",
    "src/lib/store.ts",
    "The selected role and compact-card preference are shared client state. They reset on page refresh.",
  ],
  [
    "TanStack React Query",
    "src/lib/api.ts",
    "Posts are fetched and cached. Mutations invalidate the list and detail queries after success.",
  ],
  [
    "react-icomoon",
    "src/icons/selection.json",
    "A local IcoMoon selection supplies the grid and arrow SVG icons. Replace it with your exported selection.",
  ],
  [
    "Jest + Testing Library",
    "tests/",
    "Permission, API, schema, and interactive form tests run with npm test.",
  ],
  [
    "Storybook",
    "src/components/PostForm.stories.tsx",
    "Run npm run storybook to explore the form and icons in isolation.",
  ],
];
export default function Guide() {
  return (
    <Layout>
      <p className="text-xs text-stone-500">UNDER THE HOOD</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Built to explore.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-stone-500">
        One small dashboard. A practical example of every tool in the stack.
        Follow the file paths to see how the pieces fit together.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {examples.map(([title, path, description]) => (
          <section
            key={title}
            className="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              {description}
            </p>
            <code className="mt-4 block break-all text-[11px] text-[#64852c]">
              {path}
            </code>
          </section>
        ))}
      </div>
      <aside className="mt-8 rounded-2xl bg-[#e9e6dc] p-6 text-sm leading-6">
        <strong>About this demo</strong>
        <p>
          Role switching is a teaching tool, not authentication: API requests
          carry a user-selectable demo role. For production, derive roles from a
          verified server session. Posts live in server memory and reset on
          restart; use a database for durable storage.
        </p>
      </aside>
    </Layout>
  );
}
