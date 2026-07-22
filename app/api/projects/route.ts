import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/services/project.service";
import { uploadProjectImage } from "@/lib/upload";

const service = new ProjectService();

export async function GET() {
  const projects = await service.getAll();

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const developer = formData.get("developer") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const description = formData.get("description") as string;

    const categoryId = Number(formData.get("categoryId"));

    const coverFile = formData.get("coverImage") as File | null;
    const galleryFile1 = formData.get("gallery1") as File | null;
    const galleryFile2 = formData.get("gallery2") as File | null;
    const galleryFile3 = formData.get("gallery3") as File | null;

    let coverImage = "";
    let gallery1 = "";
    let gallery2 = "";
    let gallery3 = "";

    if (coverFile) {
      coverImage = await uploadProjectImage(coverFile);
    }

    if (galleryFile1) {
      gallery1 = await uploadProjectImage(galleryFile1);
    }

    if (galleryFile2) {
      gallery2 = await uploadProjectImage(galleryFile2);
    }

    if (galleryFile3) {
      gallery3 = await uploadProjectImage(galleryFile3);
    }

    const project = await service.create({
      title,
      developer,
      location,
      price,
      whatsapp,
      description,

      coverImage,
      gallery1,
      gallery2,
      gallery3,

      categoryId,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create project",
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