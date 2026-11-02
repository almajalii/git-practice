import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setRole, type RootState } from "../lib/store";
import type { Role } from "../lib/ability";
import { Icon } from "./Icon";
export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const role = useSelector((s: RootState) => s.preferences.role);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Folio — Ideas in good company</title>
        <meta
          name="description"
          content="A working Next.js Pages Router dashboard with authorization, forms, state, and server caching."
        />
      </Head>
      <div className="mx-auto min-h-screen max-w-[1600px] lg:grid lg:grid-cols-[236px_1fr]">
        <aside className="border-b border-stone-200 bg-[#efefe9] p-6 lg:flex lg:min-h-screen lg:flex-col lg:border-r lg:border-b-0 lg:p-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-3xl font-bold tracking-tighter"
          >
            <span className="text-[#64852c]">✳</span> folio
            <span className="text-[#789c40]">.</span>
          </Link>
          <p className="mt-2 text-xs text-stone-500">
            A little space for big ideas.
          </p>
          <p className="mt-12 mb-4 text-[10px] font-bold tracking-[.18em] text-stone-400">
            WORKSPACE
          </p>
          <Link
            href="/"
            className={
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold " +
              (router.pathname === "/" ? "bg-[#dce9c4]" : "hover:bg-stone-200")
            }
          >
            <Icon /> All posts <span className="ml-auto">↗</span>
          </Link>
          <Link
            href="/guide"
            className={
              "mt-2 block rounded-xl px-4 py-3 text-sm " +
              (router.pathname === "/guide" ? "bg-[#dce9c4]" : "text-stone-600")
            }
          >
            ◈ &nbsp; Developer guide
          </Link>
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white/60 p-4 lg:mt-auto">
            <p className="text-xs font-semibold">Your demo workspace</p>
            <p className="mt-2 text-xs leading-5 text-stone-500">
              Try a different role to see permissions in action.
            </p>
            <label htmlFor="role" className="sr-only">
              Demo role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => dispatch(setRole(e.target.value as Role))}
              className="mt-3 w-full rounded-lg border border-stone-200 bg-white p-2 text-sm"
            >
              <option value="reader">Reader · view only</option>
              <option value="editor">Editor · create & edit</option>
              <option value="admin">Admin · full access</option>
            </select>
          </div>
          <p className="mt-6 text-[10px] text-stone-400">
            MADE FOR THE WAY YOU THINK
          </p>
        </aside>
        <main className="min-w-0 px-6 py-7 md:px-12 lg:px-14">
          <header className="mb-12 flex items-center justify-between border-b border-stone-200 pb-6">
            <span className="text-xs text-stone-500">
              Workspace <span className="mx-3 text-stone-300">/</span>{" "}
              <span className="text-stone-800">
                {router.pathname === "/guide"
                  ? "Developer guide"
                  : "Your journal"}
              </span>
            </span>
            <span className="flex items-center gap-3 text-xs">
              <span className="hidden text-stone-500 sm:block">
                Personal workspace
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#dfdacd] font-semibold">
                JD
              </span>
            </span>
          </header>
          {children}
          <footer className="mt-20 flex justify-between border-t border-stone-200 py-6 text-[10px] text-stone-400">
            <span>FOLIO / A PLACE FOR YOUR PERSPECTIVE</span>
            <span>Built with Next.js & a little curiosity.</span>
          </footer>
        </main>
      </div>
    </>
  );
}
