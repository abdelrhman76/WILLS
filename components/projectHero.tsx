import Image from "next/image";

export default function ProjectHero({
  project,
}: {
  project: any;
}) {
  return (
    <section className="bg-[#071B44] text-white rounded-b-[60px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <p className="uppercase tracking-[5px] text-sky-400 font-semibold">
              {project.developer}
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold mt-5 leading-tight">
              {project.title}
            </h1>

            <p className="text-2xl text-gray-300 mt-5">
              📍 {project.location}
            </p>

            <p className="mt-8 text-lg leading-9 text-gray-300 whitespace-pre-line">
              {project.description}
            </p>

           <div className="flex flex-col sm:flex-row gap-5 mt-14">

  <a
    href="https://wa.me/201154209198"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-5 px-10 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-[1.03]"
  >
    <span className="text-2xl">💬</span>
    WhatsApp
  </a>

  <a
    href="#payment-plan"
    className="flex-1 flex items-center justify-center gap-3 bg-white text-[#071B44] border-2 border-white hover:bg-[#071B44] hover:text-white py-5 px-10 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-[1.03]"
  >
    <span className="text-xl">📄</span>
    Payment Plan
  </a>

</div>

          </div>

          {/* RIGHT */}

          <div>

            {/* Gallery */}

            <div className="grid grid-cols-3 gap-4 mb-5">

              {project.gallery1 && (
                <Image
                  src={project.gallery1}
                  alt="Gallery 1"
                  width={220}
                  height={160}
                  className="w-full h-[150px] rounded-2xl object-cover cursor-pointer transition duration-500 hover:scale-105 hover:shadow-2xl"
                />
              )}

              {project.gallery2 && (
                <Image
                  src={project.gallery2}
                  alt="Gallery 2"
                  width={220}
                  height={160}
                  className="w-full h-[150px] rounded-2xl object-cover cursor-pointer transition duration-500 hover:scale-105 hover:shadow-2xl"
                />
              )}

              {project.gallery3 && (
                <Image
                  src={project.gallery3}
                  alt="Gallery 3"
                  width={220}
                  height={160}
                  className="w-full h-[150px] rounded-2xl object-cover cursor-pointer transition duration-500 hover:scale-105 hover:shadow-2xl"
                />
              )}

            </div>

            {/* Cover */}

            <Image
              src={project.coverImage}
              alt={project.title}
              width={700}
              height={750}
              priority
              className="w-full h-[620px] rounded-[35px] object-cover shadow-2xl transition duration-500 hover:scale-[1.02]"
            />

          </div>

        </div>

      </div>
    </section>
  );
}