type PaymentPlan = {
  id: number;

  title: string;

  paymentType: string | null;

  years: number | null;

  originalPrice: number;

  discount: number;

  newPrice: number;

  downPayment: number;

  secondPayment: number | null;

  remainingAmount: number;

  installmentCount: number;

  installmentValue: number;
};

export default function PaymentPlanCards({
  plans,
}: {
  plans: PaymentPlan[];
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {plans.map((plan) => (

        <div
          key={plan.id}
          className="rounded-3xl shadow-xl border overflow-hidden bg-white"
        >

          <div className="bg-[#071B44] text-white p-6">

            <h2 className="text-3xl font-bold">
              {plan.title}
            </h2>

            <p className="text-sky-300 mt-2">
              {plan.paymentType}
            </p>

          </div>

          <div className="p-8 space-y-4">

            <Row
              title="Original Price"
              value={plan.originalPrice}
            />

            <Row
              title="Discount"
              value={`${plan.discount}%`}
            />

            <Row
              title="New Price"
              value={plan.newPrice}
            />

            <Row
              title="Down Payment"
              value={plan.downPayment}
            />

            {plan.secondPayment && (

              <Row
                title="Second Payment"
                value={plan.secondPayment}
              />

            )}

            <Row
              title="Remaining"
              value={plan.remainingAmount}
            />

            <Row
              title="Installments"
              value={plan.installmentCount}
            />

            <Row
              title="Installment Value"
              value={plan.installmentValue}
            />

          </div>

          <div className="p-8">

            <button
              className="w-full bg-[#4AA8FF] hover:bg-[#2d93f5] text-white rounded-xl py-4 font-bold"
            >
              View Details
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between border-b pb-3">

      <span className="text-gray-500">
        {title}
      </span>

      <span className="font-bold text-[#071B44]">
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </span>

    </div>
  );
}