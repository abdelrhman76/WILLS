import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/services/project.service";
import { uploadProjectImage } from "@/lib/upload";

const service = new ProjectService();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await service.getById(Number(id));

  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const developer = formData.get("developer") as string;
  const location = formData.get("location") as string;
  const price = formData.get("price") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const description = formData.get("description") as string;

  const coverFile = formData.get("coverImage") as File | null;
  const galleryFile1 = formData.get("gallery1") as File | null;
  const galleryFile2 = formData.get("gallery2") as File | null;
  const galleryFile3 = formData.get("gallery3") as File | null;

  let coverImage: string | undefined;
  let gallery1: string | undefined;
  let gallery2: string | undefined;
  let gallery3: string | undefined;

  if (coverFile && coverFile.size > 0) {
    coverImage = await uploadProjectImage(coverFile);
  }

  if (galleryFile1 && galleryFile1.size > 0) {
    gallery1 = await uploadProjectImage(galleryFile1);
  }

  if (galleryFile2 && galleryFile2.size > 0) {
    gallery2 = await uploadProjectImage(galleryFile2);
  }

  if (galleryFile3 && galleryFile3.size > 0) {
    gallery3 = await uploadProjectImage(galleryFile3);
  }

  const project = await service.update(Number(id), {
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
  });

  return NextResponse.json(project);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await service.delete(Number(id));

  return NextResponse.json({
    success: true,
  });
}