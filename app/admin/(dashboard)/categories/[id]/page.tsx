import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteProjectButton from "@/components/DeleteProjectButton";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      projects: true,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold text-[#071B44]">
            {category.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {category.projects.length} Projects
          </p>

        </div>

        <Link
          href={`/admin/categories/${category.id}/projects/new`}
          className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-2xl"
        >
          + Add Project
        </Link>

      </div>

      {category.projects.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

          <h2 className="text-3xl font-bold">
            No Projects Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start by adding your first project.
          </p>

        </div>

      ) : (

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {category.projects.map((project:any) => (

    <div
      key={project.id}
      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
    >

      <img
        src={project.coverImage}
        className="w-full h-64 object-cover"
        alt={project.title}
      />

      <div className="p-6">

        <h2 className="text-3xl font-bold text-[#071B44]">
          {project.title}
        </h2>

        <p className="mt-3 text-gray-500">
          📍 {project.location}
        </p>

        <p className="mt-2 text-gray-500">
          🏢 {project.developer}
        </p>

        <p className="mt-4 text-sky-600 text-2xl font-bold">
          {project.price}
        </p>

        <div className="flex flex-col gap-4 mt-6">

  <div className="grid grid-cols-2 gap-4">

    <Link
  href={`/#category-${category.id}`}
  className="bg-[#071B44] hover:bg-[#0d2b68] text-white text-center py-3 rounded-2xl font-semibold transition"
>
  View
</Link>

       <Link
  href={`/admin/categories/${category.id}/projects/${project.id}/edit`}
  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl py-3 text-center font-semibold"
>
  Edit
</Link>

  </div>

  <div className="grid grid-cols-2 gap-4">

    <Link
      href={`/admin/categories/${project.categoryId}/projects/${project.id}/payment-plans`}
      className="bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-2xl font-semibold transition"
    >
      Payment Plans
    </Link>

   <DeleteProjectButton id={project.id} />
  </div>

</div>

      </div>

    </div>

  ))}

</div>

      )}

    </div>
  );
}