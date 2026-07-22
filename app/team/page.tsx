import Image from "next/image";

export default function Brokers() {
  return (
    <section
      id="brokers"
      className="max-w-7xl mx-auto py-28 px-6 lg:px-10"
    >
      <div className="text-center mb-16">

        <p className="uppercase tracking-[5px] text-sky-500 font-semibold">
          Professional Team
        </p>

        <h2 className="text-4xl lg:text-5xl font-semibold text-[#071B44] mt-3">
          Meet Our Brokers
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-gray-500">
          Our experienced real estate consultants are ready to help you find
          your next investment.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Ahmed */}

        <div className="group bg-white rounded-[35px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

          <div className="relative h-[560px] bg-gradient-to-b from-slate-100 to-white flex items-end justify-center">

            <span className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Available Now
            </span>

            <Image
              src="/brokers/broker1.jpg"
              alt="Ahmed Hassan"
              width={500}
              height={700}
              className="h-[530px] w-auto object-contain transition duration-500 group-hover:scale-105"
            />

          </div>

          <div className="p-8 text-center">

            <h3 className="text-3xl font-bold text-[#071B44]">
              Ahmed Hassan
            </h3>

            <p className="text-gray-500 mt-3">
              Senior Property Consultant
            </p>

            <a
              href="https://wa.me/201154209198"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-10 py-4 rounded-2xl font-semibold shadow-lg transition duration-300 hover:scale-105"
            >
              💬 Contact on WhatsApp
            </a>

          </div>

        </div>

        {/* Ziad */}

        <div className="group bg-white rounded-[35px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

          <div className="relative h-[560px] bg-gradient-to-b from-slate-100 to-white flex items-end justify-center">

            <span className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Available Now
            </span>

            <Image
              src="/brokers/broker2.jpg"
              alt="Ziad Shosha"
              width={500}
              height={700}
              className="h-[530px] w-auto object-contain transition duration-500 group-hover:scale-105"
            />

          </div>

          <div className="p-8 text-center">

            <h3 className="text-3xl font-bold text-[#071B44]">
              Ziad Shosha
            </h3>

            <p className="text-gray-500 mt-3">
              Senior Property Consultant
            </p>

            <a
              href="https://wa.me/201154209198"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-10 py-4 rounded-2xl font-semibold shadow-lg transition duration-300 hover:scale-105"
            >
              💬 Contact on WhatsApp
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}