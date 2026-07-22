import Link from "next/link";
import { PaymentPlanService } from "@/lib/services/paymentPlan.service";
import { ProjectService } from "@/lib/services/project.service";

const paymentService = new PaymentPlanService();
const projectService = new ProjectService();

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PaymentPlansPage({
  params,
}: Props) {
  const { id } = await params;

  const projectId = Number(id);

  const project = await projectService.getById(projectId);

  if (!project) {
    return (
      <div className="text-center py-20">
        Project Not Found
      </div>
    );
  }

  const plans = await paymentService.getByProject(projectId);

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Payment Plans
          </h1>

          <p className="text-gray-500 mt-2">
            {project.title}
          </p>
        </div>

        <Link
          href={`/admin/(dashboard)/categories/[id]/projects/${project.id}/payment-plans/new`}
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Payment Plan
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Years
              </th>

              <th className="p-4 text-left">
                Original Price
              </th>

              <th className="p-4 text-left">
                Discount
              </th>

              <th className="p-4 text-left">
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

                <td className="p-4">
                  {plan.title}
                </td>

                <td className="p-4">
                  {plan.years}
                </td>

                <td className="p-4">
                  {plan.originalPrice.toLocaleString()} EGP
                </td>

                <td className="p-4">
                  {plan.discount}%
                </td>

                <td className="p-4 flex gap-3">

                  <Link
                    href={`/admin/projects/${project.id}/payment-plans/${plan.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {plans.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="text-center p-10 text-gray-500"
                >
                  No Payment Plans Yet
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}