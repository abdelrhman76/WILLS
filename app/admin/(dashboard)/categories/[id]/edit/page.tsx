import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    notFound();
  }

  return <CategoryForm category={category} />;
}