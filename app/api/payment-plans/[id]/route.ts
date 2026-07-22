import { NextRequest, NextResponse } from "next/server";
import { PaymentPlanService } from "@/lib/services/paymentPlan.service";

const service = new PaymentPlanService();

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  await service.delete(Number(id));

  return NextResponse.json({
    success: true,
  });
}