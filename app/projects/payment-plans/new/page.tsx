import PaymentPlanForm from "@/components/admin/PaymentPlanForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (

    <div className="max-w-3xl">

      <h1 className="text-4xl font-bold mb-10">

        Add Payment Plan

      </h1>

      <PaymentPlanForm
        projectId={Number(id)}
      />

    </div>

  );

}