import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const projectsCount = await prisma.project.count();
  const categoriesCount = await prisma.category.count();

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome back to WILLS Admin Dashboard
      </p>

      <div className="grid grid-cols-2 gap-8 mt-12">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-gray-500">
            Projects
          </h2>

          <p className="text-5xl font-bold mt-4 text-[#071B44]">
            {projectsCount}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-gray-500">
            Categories
          </h2>

          <p className="text-5xl font-bold mt-4 text-[#071B44]">
            {categoriesCount}
          </p>

        </div>

      </div>

    </div>
  );
}