import Link from "next/link";
import { CategoryService } from "@/lib/services/category.service";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

const service = new CategoryService();

export default async function CategoriesPage() {
  const categories: any[] = await service.getAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Categories</h1>

          <p className="text-gray-500 mt-2">
            Manage all project categories
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="bg-sky-500 hover:bg-sky-600 text-white px-7 py-4 rounded-2xl font-semibold"
        >
          + Add Category
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={category.bannerImage || "/images/no-image.jpg"}
              alt={category.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#071B44]">
                {category.name}
              </h2>

              <p className="text-gray-600 mt-5">
                <span className="font-semibold">Price Range</span>
              </p>

              <p className="text-sky-600 font-bold text-xl">
                {category.minPrice.toLocaleString()} EGP →{" "}
                {category.maxPrice.toLocaleString()} EGP
              </p>

              {category.description && (
                <p className="text-gray-500 mt-4">
                  {category.description}
                </p>
              )}

              <p className="mt-5 font-semibold text-gray-700">
                {category.projects.length} Projects
              </p>

              <div className="flex gap-3 mt-8">
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="flex-1 bg-[#071B44] hover:bg-[#0b255d] text-center text-white py-3 rounded-xl"
                >
                  Manage Projects
                </Link>

                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
                >
                  Edit
                </Link>

                <DeleteCategoryButton id={category.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}