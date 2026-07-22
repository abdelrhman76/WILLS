"use client";

import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

export default function DeletePaymentPlanButton({ id }: Props) {
  const router = useRouter();

  async function deletePlan() {
    const ok = window.confirm(
      "Are you sure you want to delete this payment plan?"
    );

    if (!ok) return;

    const res = await fetch(`/api/payment-plans/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete payment plan");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deletePlan}
      className="
      bg-red-500
      hover:bg-red-600
      text-white
      px-5
      py-2
      rounded-xl
      transition
      "
    >
      Delete
    </button>
  );
}