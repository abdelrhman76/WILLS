import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      projects: {
        include: {
          paymentPlans: true,
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

      {/* Banner */}

      <div className="relative overflow-hidden rounded-[35px]">

        <Image
          src={category.bannerImage || "/images/no-image.jpg"}
          alt={category.name}
          width={1600}
          height={600}
          className="w-full h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071B44]/90 via-[#071B44]/55 to-transparent" />

        <div className="absolute left-12 bottom-12">

          <p className="uppercase tracking-[4px] text-sky-300 font-semibold">
            Featured Category
          </p>

          <h1 className="text-6xl font-bold text-white mt-3">
            {category.name}
          </h1>

          <p className="text-white/80 mt-4 text-lg max-w-xl leading-8">
            {category.description}
          </p>

        </div>

      </div>

      {/* Projects */}

      <div className="grid lg:grid-cols-2 gap-10 mt-16">

        {category.projects.map((project: any) => (

          <div
            key={project.id}
            className="group bg-white rounded-[35px] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-500"
          >

            {/* Main Image */}

            <div className="overflow-hidden">

              <Image
                src={project.coverImage}
                alt={project.title}
                width={700}
                height={450}
                className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-700"
              />

            </div>

            {/* Gallery */}

            <div className="flex gap-3 px-6 pt-5">

              {project.gallery1 && (
                <Image
                  src={project.gallery1}
                  alt=""
                  width={120}
                  height={80}
                  className="rounded-xl object-cover h-20 flex-1"
                />
              )}

              {project.gallery2 && (
                <Image
                  src={project.gallery2}
                  alt=""
                  width={120}
                  height={80}
                  className="rounded-xl object-cover h-20 flex-1"
                />
              )}

              {project.gallery3 && (
                <Image
                  src={project.gallery3}
                  alt=""
                  width={120}
                  height={80}
                  className="rounded-xl object-cover h-20 flex-1"
                />
              )}

            </div>

            <div className="p-8">

              <h2 className="text-3xl font-bold text-[#071B44]">
                {project.title}
              </h2>

              <p className="mt-4 text-gray-500">
                📍 {project.location}
              </p>

              <p className="mt-2 text-gray-500">
                🏢 {project.developer}
              </p>

              <div className="mt-6">

                <span className="text-gray-500">
                  Starting From
                </span>

                <h3 className="text-4xl font-bold text-sky-600 mt-2">
                  {project.price}
                </h3>

              </div>

              {/* Payment Plans */}

              <div className="flex flex-wrap gap-3 mt-8">

                {project.paymentPlans.map((plan: any) => (

                  <span
                    key={plan.id}
                    className="bg-sky-100 text-sky-700 px-5 py-2 rounded-full font-medium"
                  >
                    {plan.title}
                  </span>

                ))}

              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-10 flex justify-center items-center bg-[#071B44] hover:bg-[#4AA8FF] text-white rounded-2xl py-4 font-semibold transition duration-300"
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}