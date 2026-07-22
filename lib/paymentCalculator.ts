export function calculatePayment(plan: {
  originalPrice: number;
 discount: number;
 downPayment: number;
 secondPayment?: number | null;
 years: number;
}) {
  const discountedPrice =
    plan.originalPrice -
    (plan.originalPrice * plan.discount) / 100;

  const second = plan.secondPayment ?? 0;

  const remaining =
    discountedPrice -
    plan.downPayment -
    second;

  const installments = plan.years * 4;

  const installmentValue =
    remaining / installments;

  return {
    discountedPrice,
    remaining,
    installments,
    installmentValue,
  };
}