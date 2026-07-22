"use client";

import { calculatePayment } from "@/lib/paymentCalculator";

type PaymentCardProps = {
  plan: {
    title: string;
    years: number;
    originalPrice: number;
    discount: number;
    downPayment: number;
    secondPayment?: number | null;
  };

  onClick: () => void;
};

export default function PaymentCard({
  plan,
  onClick,
}: PaymentCardProps) {
  const calc = calculatePayment(plan);

  return (
    <div className="group bg-white rounded-[28px] shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 p-8 flex flex-col h-full">

      {/* Badge */}

      <div className="flex justify-between items-center">

        <span className="bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm font-semibold">
          {plan.discount}% Discount
        </span>

        <span className="text-gray-500 font-medium">
          {plan.years} Years
        </span>

      </div>

      {/* Title */}

      <h3 className="text-3xl font-bold text-[#071B44] mt-8">
        {plan.title}
      </h3>

      {/* Price */}

      <div className="mt-8">

        <p className="text-gray-400 text-sm">
          Original Price
        </p>

        <h2 className="text-4xl font-extrabold text-[#071B44] mt-2">
          {plan.originalPrice.toLocaleString()} EGP
        </h2>

      </div>

      {/* Details */}

      <div className="mt-8 space-y-5 flex-1">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Down Payment
          </span>

          <span className="font-semibold">
            {plan.downPayment}%
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Quarterly Installment
          </span>

          <span className="font-bold text-[#071B44]">
            {calc.installmentValue.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{" "}
            EGP
          </span>

        </div>

      </div>

      {/* Button */}

      <button
        onClick={onClick}
        className="mt-10 w-full bg-[#071B44] hover:bg-sky-500 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
      >
        View Details →
      </button>

    </div>
  );
}