"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-[#071B44] text-white flex flex-col">

        <div className="p-8 border-b border-slate-700">
          <h1 className="text-3xl font-bold">
            WILLS
          </h1>

          <p className="text-slate-400 mt-2">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex-1 p-6 space-y-3">

          <Link
            href="/admin/dashboard"
            className="block rounded-xl px-4 py-3 hover:bg-sky-500 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/categories"
            className="block rounded-xl px-4 py-3 hover:bg-sky-500 transition"
          >
            📂 Categories
          </Link>

        </nav>

        <div className="p-6 border-t border-slate-700">

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 rounded-xl py-3 font-semibold transition"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}