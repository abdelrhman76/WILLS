import Navbar from "@/components/Navbar";
import ProjectHero from "@/components/projectHero";
import PaymentPlans from "@/components/paymentPlans";
import { ProjectService } from "@/lib/services/project.service";

const service = new ProjectService();

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await service.getBySlug(slug);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-[#071B44]">
          Project Not Found
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <ProjectHero project={project} />

      {/* Quick Info */}

      <section className="-mt-12 relative z-20">
        <div className="max-w-6xl mx-auto bg-white rounded-[30px] shadow-2xl p-8">

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <p className="text-gray-500 mb-2">
                📍 Location
              </p>

              <h3 className="text-2xl font-bold text-[#071B44]">
                {project.location}
              </h3>

            </div>

            <div>

              <p className="text-gray-500 mb-2">
                🏢 Developer
              </p>

              <h3 className="text-2xl font-bold text-[#071B44]">
                {project.developer}
              </h3>

            </div>

            <div>

              <p className="text-gray-500 mb-2">
                💰 Starting Price
              </p>

              <h3 className="text-2xl font-bold text-sky-600">
                {project.price}
              </h3>

            </div>

          </div>

        </div>
      </section>

      {/* Payment Plans */}

      <section
        id="payment-plan"
        className="py-28 px-6"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[5px] text-sky-500 font-semibold">
              Flexible Payment Options
            </p>

            <h2 className="text-4xl lg:text-5xl font-semibold text-[#071B44] mt-3">
              Payment Plans
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-gray-500">
              Choose the payment plan that best fits your investment strategy and budget.
            </p>

          </div>

          <PaymentPlans
            plans={project.paymentPlans}
          />

        </div>

      </section>

    </>
  );
}