"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";

const inputStyle = `
w-full
h-14
rounded-2xl
border
border-gray-300
px-5
text-lg
outline-none
transition
focus:border-sky-500
focus:ring-2
focus:ring-sky-200
`;


export default function AddPaymentPlan({
  params,
}: {
  params: Promise<{
    id: string;
    projectId: string;
  }>;
}) {

  const { id, projectId } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [years, setYears] = useState("");

  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [downPayment, setDownPayment] = useState("");
  const [secondPayment, setSecondPayment] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");

  const [installmentCount, setInstallmentCount] = useState("");
  const [installmentValue, setInstallmentValue] = useState("");

  const onlyNumbers = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  async function savePlan() {
    setLoading(true);

    const res = await fetch("/api/payment-plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        paymentType,

        years: Number(years),

        originalPrice: Number(originalPrice),

        discount: Number(discount),

        discountAmount: Number(discountAmount),

        newPrice: Number(newPrice),

        downPayment: Number(downPayment),

        secondPayment:
          secondPayment === ""
            ? null
            : Number(secondPayment),

        remainingAmount: Number(remainingAmount),

        installmentCount: Number(installmentCount),

        installmentValue: Number(installmentValue),

        projectId: Number(projectId),
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(
        `/admin/categories/${id}/projects/${projectId}/payment-plans`
      );
    } else {
      const err = await res.text();
      console.log(err);
      alert("Error Saving Payment Plan");
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-12">

      <h1 className="text-4xl font-bold text-[#071B44] mb-10">
        Add Payment Plan
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <input
          className={inputStyle}
          placeholder="Plan Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className={inputStyle}
          placeholder="Payment Type"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        />

        <input
          className={inputStyle}
          placeholder="Years"
          value={years}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setYears)}
        />

        <input
          className={inputStyle}
          placeholder="Original Price"
          value={originalPrice}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setOriginalPrice)}
        />

        <input
          className={inputStyle}
          placeholder="Discount %"
          value={discount}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setDiscount)}
        />

        <input
          className={inputStyle}
          placeholder="Discount Amount"
          value={discountAmount}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setDiscountAmount)}
        />

        <input
          className={inputStyle}
          placeholder="New Price"
          value={newPrice}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setNewPrice)}
        />

        <input
          className={inputStyle}
          placeholder="Down Payment"
          value={downPayment}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setDownPayment)}
        />

        <input
          className={inputStyle}
          placeholder="Second Payment"
          value={secondPayment}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setSecondPayment)}
        />

        <input
          className={inputStyle}
          placeholder="Remaining Amount"
          value={remainingAmount}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setRemainingAmount)}
        />

        <input
          className={inputStyle}
          placeholder="Installments Count"
          value={installmentCount}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setInstallmentCount)}
        />

        <input
          className={inputStyle}
          placeholder="Installment Value"
          value={installmentValue}
          inputMode="numeric"
          onChange={(e) => onlyNumbers(e, setInstallmentValue)}
        />

      </div>

      <div className="flex justify-center mt-12">

        <button
          onClick={savePlan}
          disabled={loading}
          className="bg-sky-500 hover:bg-sky-600 text-white px-12 py-4 rounded-2xl text-lg font-bold transition"
        >
          {loading ? "Saving..." : "Save Payment Plan"}
        </button>

      </div>

    </div>
  );
}