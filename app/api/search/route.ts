import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/services/project.service";

const service = new ProjectService();

export async function GET(req: NextRequest) {
  const q =
    new URL(req.url).searchParams.get("q") ?? "";

  if (!q) {
    return NextResponse.json([]);
  }

  const result = await service.search(q);

  return NextResponse.json(result);
}