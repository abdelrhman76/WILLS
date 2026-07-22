import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";
import { uploadCategoryImage } from "@/lib/upload";

const service = new CategoryService();

export async function GET() {
  const data = await service.getAll();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const minPrice = Number(formData.get("minPrice"));
    const maxPrice = Number(formData.get("maxPrice"));
    const description = (formData.get("description") as string) || "";

    const image = formData.get("image") as File | null;

    let bannerImage = "";

    if (image && image.size > 0) {
      bannerImage = await uploadCategoryImage(image);
    }

    const category = await service.create({
      name,
      minPrice,
      maxPrice,
      description,
      bannerImage,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = Number(searchParams.get("id"));

  await service.delete(id);

  return NextResponse.json({
    success: true,
  });
  
}