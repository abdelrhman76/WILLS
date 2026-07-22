import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";
import { uploadCategoryImage } from "@/lib/upload";

const service = new CategoryService();

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log("STEP 1");

    const { id } = await params;

    console.log("STEP 2");

    const formData = await req.formData();

    console.log("STEP 3");

    const name = formData.get("name") as string;
    const minPrice = Number(formData.get("minPrice"));
    const maxPrice = Number(formData.get("maxPrice"));
    const description = formData.get("description") as string;

    const image = formData.get("image") as File | null;

    let bannerImage = formData.get("currentImage") as string;

    console.log("STEP 4");

    if (image) {
      bannerImage = await uploadCategoryImage(image);
    }

    console.log("STEP 5");

    const category = await service.update(Number(id), {
      name,
      minPrice,
      maxPrice,
      description,
      bannerImage,
    });

    console.log("STEP 6");

    return NextResponse.json(category);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "ERROR",
      },
      {
        status: 500,
      }
    );
  }
}