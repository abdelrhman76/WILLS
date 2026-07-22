"use client";

import { useRouter } from "next/navigation";

export default function DeleteCategoryButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this category?");

    if (!ok) return;

    const res = await fetch(`/api/categories?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
    >
      Delete
    </button>
  );
}