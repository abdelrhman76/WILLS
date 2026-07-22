import { NextRequest, NextResponse } from "next/server";
import { PaymentPlanService } from "@/lib/services/paymentPlan.service";

const service = new PaymentPlanService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const plan = await service.create(body);

    return NextResponse.json(plan);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const projectId = Number(
    new URL(req.url).searchParams.get("projectId")
  );

  const plans = await service.getByProject(projectId);

  return NextResponse.json(plans);
}