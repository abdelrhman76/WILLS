"use client";

import { calculatePayment } from "@/lib/paymentCalculator";

type PaymentModalProps = {
  plan: {
    title: string;
    years: number;
    originalPrice: number;
    discount: number;
    downPayment: number;
    secondPayment: number | null;
  };

  onClose: () => void;
};

export default function PaymentModal({
  plan,
  onClose,
}: PaymentModalProps) {

  const calc = calculatePayment(plan);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[750px] max-h-[90vh] overflow-y-auto p-10 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl font-bold text-gray-500 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-4xl font-bold text-[#071B44]">
          {plan.title}
        </h2>

        <p className="text-sky-500 text-xl mt-2">
          {plan.years} Years
        </p>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <Info
            title="Original Price"
            value={`${plan.originalPrice.toLocaleString()} EGP`}
          />

          <Info
            title="Discount"
            value={`${plan.discount}%`}
          />

          <Info
            title="New Price"
            value={`${calc.discountedPrice.toLocaleString()} EGP`}
          />

          <Info
            title="Down Payment"
            value={`${plan.downPayment.toLocaleString()} EGP`}
          />

          <Info
            title="Second Payment"
            value={
              plan.secondPayment
                ? `${plan.secondPayment.toLocaleString()} EGP`
                : "No Second Payment"
            }
          />

          <Info
            title="Remaining Amount"
            value={`${calc.remaining.toLocaleString()} EGP`}
          />

          <Info
            title="Installments"
            value={`${calc.installments}`}
          />

          <Info
            title="Installment Value"
            value={`${calc.installmentValue.toLocaleString()} EGP`}
          />

        </div>

        <button className="mt-12 w-full bg-sky-500 hover:bg-sky-600 text-white py-5 rounded-2xl text-xl font-semibold transition">
          Contact Sales
        </button>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-100 rounded-2xl p-5">

      <p className="text-gray-500">
        {title}
      </p>

      <h3 className="font-bold text-xl mt-2 text-[#071B44]">
        {value}
      </h3>

    </div>
  );
}