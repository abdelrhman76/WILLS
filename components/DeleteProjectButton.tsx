"use client";

import { useRouter } from "next/navigation";

export default function DeleteProjectButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function deleteProject() {
    if (!confirm("Delete this project?")) return;

    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      window.location.reload();
    }
  }

  return (
    <button
      onClick={deleteProject}
      className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition w-full"
    >
      Delete
    </button>
  );
}