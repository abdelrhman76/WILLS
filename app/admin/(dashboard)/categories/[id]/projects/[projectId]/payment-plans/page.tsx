import Link from "next/link";
import DeletePaymentPlanButton from "@/components/DeletePaymentPlanButton";
import { notFound } from "next/navigation";
import { ProjectService } from "@/lib/services/project.service";
import { PaymentPlanService } from "@/lib/services/paymentPlan.service";

const projectService = new ProjectService();
const paymentService = new PaymentPlanService();

export default async function PaymentPlansPage({
  params,
}: {
  params: Promise<{
    id: string;
    projectId: string;
  }>;
}) {
  const { id, projectId } = await params;

  const project = await projectService.getById(Number(projectId));

  if (!project) {
    notFound();
  }

  const plans = await paymentService.getByProject(Number(projectId));

  return (
    <div>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          <p className="text-gray-500 mt-2">
            Payment Plans
          </p>

        </div>

        <Link
          href={`/admin/categories/${id}/projects/${projectId}/payment-plans/new`}
          className="bg-sky-500 hover:bg-sky-600 text-white px-7 py-4 rounded-2xl"
        >
          + Add Payment Plan
        </Link>

      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-5 text-left">
                Title
              </th>

              <th className="p-5">
                Years
              </th>

              <th className="p-5">
                Original Price
              </th>

              <th className="p-5">
                Discount
              </th>

              <th className="p-5">
                Down Payment
              </th>

              <th className="p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {plans.map((plan:any) => (

              <tr
                key={plan.id}
                className="border-t"
              >

                <td className="p-5">
                  {plan.title}
                </td>

                <td className="text-center">
                  {plan.years}
                </td>

                <td className="text-center">
                  {plan.originalPrice.toLocaleString()}
                </td>

                <td className="text-center">
                  {plan.discount}%
                </td>

                <td className="text-center">
                  {plan.downPayment.toLocaleString()}
                </td>

            <td>

  <div className="flex justify-center">

    <DeletePaymentPlanButton id={plan.id} />

  </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}