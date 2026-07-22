"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPlanForm({
  projectId,
  plan,
}: {
  projectId: number;
  plan?: any;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(plan?.title || "");

  const [years, setYears] = useState(
    plan?.years?.toString() || ""
  );

  const [originalPrice, setOriginalPrice] = useState(
    plan?.originalPrice?.toString() || ""
  );

  const [discount, setDiscount] = useState(
    plan?.discount?.toString() || "0"
  );

  const [downPayment, setDownPayment] = useState(
    plan?.downPayment?.toString() || ""
  );

  const [secondPayment, setSecondPayment] = useState(
    plan?.secondPayment?.toString() || ""
  );

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const body = {
      title,
      years: Number(years),
      originalPrice: Number(originalPrice),
      discount: Number(discount),
      downPayment: Number(downPayment),
      secondPayment:
        secondPayment === ""
          ? null
          : Number(secondPayment),
      projectId,
    };

    const res = await fetch("/api/payment-plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed");
      return;
    }

    router.push(
      `/admin/projects/${projectId}/payment-plans`
    );

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-10 rounded-3xl shadow-xl"
    >
      <input
        className="w-full border p-4 rounded-xl"
        placeholder="Plan Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-4 rounded-xl"
        placeholder="Years"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />

      <input
        className="w-full border p-4 rounded-xl"
        placeholder="Original Price"
        value={originalPrice}
        onChange={(e) =>
          setOriginalPrice(e.target.value)
        }
      />

      <input
        className="w-full border p-4 rounded-xl"
        placeholder="Discount %"
        value={discount}
        onChange={(e) =>
          setDiscount(e.target.value)
        }
      />

      <input
        className="w-full border p-4 rounded-xl"
        placeholder="Down Payment"
        value={downPayment}
        onChange={(e) =>
          setDownPayment(e.target.value)
        }
      />

      <input
        className="w-full border p-4 rounded-xl"
        placeholder="Second Payment"
        value={secondPayment}
        onChange={(e) =>
          setSecondPayment(e.target.value)
        }
      />

      <button
        disabled={loading}
        className="w-full bg-sky-500 text-white py-4 rounded-xl"
      >
        {loading ? "Saving..." : "Save Plan"}
      </button>
    </form>
  );
}