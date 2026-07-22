"use client";

import { useState } from "react";

type PaymentPlan = {
  id: number;

  title: string;

  paymentType: string | null;

  years: number;

  originalPrice: number;

  discount: number;

  discountAmount: number;

  newPrice: number;

  downPayment: number;

  secondPayment: number | null;

  remainingAmount: number;

  installmentCount: number;

  installmentValue: number;
};

interface Props {
  plans: PaymentPlan[];
}

export default function PaymentPlans({ plans }: Props) {
  const [selected, setSelected] = useState<PaymentPlan | null>(null);

  if (!plans.length) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
        <h2 className="text-3xl font-bold">
          No Payment Plans Available
        </h2>
      </div>
    );
  }
console.log(plans);
  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        {plans.map((plan) => (

          <div
            key={plan.id}
            className="
            rounded-[28px]
            bg-white
            shadow-xl
            overflow-hidden
            border
            border-gray-100
            hover:-translate-y-2
            transition
            duration-300
            "
          >

           <div className="bg-[#071B44] p-8 text-center text-white">

  <h2 className="text-3xl font-bold">
    {plan.title}
  </h2>

  <p className="mt-3 text-sky-300 text-lg">
    {plan.paymentType}
  </p>

  {plan.discount > 0 && (

    <div className="mt-5 inline-flex rounded-full bg-green-500/20 px-5 py-2">

      <span className="font-bold text-green-300">
        {plan.discount}% OFF
      </span>

    </div>

  )}

</div>

           <div className="p-8">

  <p className="text-gray-400 text-sm">
    Starting From
  </p>

  <h2 className="text-4xl font-extrabold text-[#071B44] mt-2">

    {plan.newPrice.toLocaleString()} EGP

  </h2>

  <div className="flex items-center justify-between mt-8">

    <div>

      <p className="text-gray-400 text-sm">
        Years
      </p>

      <h3 className="text-2xl font-bold">

        {plan.years}

      </h3>

    </div>

    <div>

      <p className="text-gray-400 text-sm">
        Down Payment
      </p>

      <h3 className="text-2xl font-bold">

        {plan.downPayment.toLocaleString()} EGP

      </h3>

    </div>

  </div>

  <button
    onClick={() => setSelected(plan)}
    className="
    mt-10
    w-full
    rounded-2xl
    bg-[#4AA8FF]
    py-4
    text-lg
    font-bold
    text-white
    transition
    hover:scale-[1.02]
    hover:bg-sky-600
    "
  >

    View Details

  </button>

</div>

          </div>

        ))}

      </div>
            {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">

          <div className="w-full max-w-4xl rounded-[30px] bg-white shadow-2xl">

            {/* Header */}

            <div className="rounded-t-[30px] bg-[#071B44] px-10 py-8 text-white">

              <h2 className="text-4xl font-bold">
                {selected.title}
              </h2>

              <p className="mt-2 text-xl opacity-90">
                {selected.paymentType}
              </p>

            </div>

            {/* Body */}

            <div className="grid grid-cols-2 gap-5 p-10">

              <Info
                title="Original Price"
                value={selected.originalPrice}
              />

              <Info
                title="Discount"
                value={`${selected.discount}%`}
              />

              <Info
                title="Discount Amount"
                value={selected.discountAmount}
              />

              <Info
                title="New Price"
                value={selected.newPrice}
              />

              <Info
                title="Down Payment"
                value={selected.downPayment}
              />

              <Info
                title="Second Payment"
                value={
                  selected.secondPayment == null
                    ? "-"
                    : selected.secondPayment
                }
              />

              <Info
                title="Remaining Amount"
                value={selected.remainingAmount}
              />

              <Info
                title="Installments"
                value={selected.installmentCount}
              />

              <Info
                title="Installment Value"
                value={selected.installmentValue}
              />

              <Info
                title="Years"
                value={selected.years}
              />

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-4 border-t px-10 py-6">

              <button
                onClick={() => setSelected(null)}
                className="rounded-2xl bg-[#071B44] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#0b2d70]"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {

  let display = value;

  if (typeof value === "number") {

    switch (title) {

      case "Discount":
        display = `${value}%`;
        break;

      case "Years":
        display = `${value} Years`;
        break;

      case "Installments":
        display = `${value} Installments`;
        break;

      default:
        display = `${value.toLocaleString()} EGP`;
    }

  }

  return (
    <div className="rounded-2xl bg-gray-50 p-6">

      <p className="mb-2 text-gray-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-[#071B44]">
        {display}
      </h3>

    </div>
  );
}