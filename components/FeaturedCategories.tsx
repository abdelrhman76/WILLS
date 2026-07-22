import Link from "next/link";
import Image from "next/image";
import { CategoryRepository } from "@/lib/repositories/category.repository";

const repository = new CategoryRepository();

export default async function FeaturedCategories() {
  const categories = await repository.getAll();

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20"
    >
      {/* Heading */}

      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-sky-500 font-semibold">
          Featured Collection
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#071B44] mt-3">
          Explore Our Projects
        </h2>

        <p className="mt-5 text-lg leading-8 text-gray-500">
    Discover premium real estate opportunities with flexible payment
    plans and luxury developments.
  </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">

        {categories.map((category: any) => (

          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group"
          >

            <div className="overflow-hidden rounded-[30px] bg-white shadow-xl hover:shadow-2xl transition-all duration-500">

              {/* Image */}

              <div className="relative h-[260px] lg:h-[320px] overflow-hidden">

                <Image
                  src={
                    category.bannerImage ||
                    "/images/no-image.jpg"
                  }
                  alt={category.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <h3 className="text-white text-3xl font-bold">
                    {category.name}
                  </h3>

                  <p className="text-gray-200 mt-2">
                    {category.projects.length} Projects
                  </p>

                </div>

              </div>

              {/* Content */}

              <div className="p-8">

                <p className="text-gray-500 leading-8 min-h-[80px]">
                  {category.description}
                </p>

                <div className="flex justify-between items-center mt-8">

                  <div>

                    <p className="text-sm text-gray-400">
                      Starting From
                    </p>

                    <h4 className="text-sky-600 font-bold text-xl">
                      {category.minPrice.toLocaleString()} EGP
                    </h4>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-400">
                      Up To
                    </p>

                    <h4 className="text-sky-600 font-bold text-xl">
                      {category.maxPrice.toLocaleString()} EGP
                    </h4>

                  </div>

                </div>

                <button
                  className="mt-10 w-full bg-[#071B44] hover:bg-[#0d2b68] text-white py-4 rounded-2xl font-semibold transition-all duration-300 group-hover:bg-sky-500"
                >
                  View Projects →
                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}