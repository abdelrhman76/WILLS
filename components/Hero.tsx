import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#071B44] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}

          <div className="order-2 lg:order-1">

            <p className="uppercase tracking-[6px] text-sky-400 font-semibold mb-4">
              Luxury Real Estate
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight text-white">
              Future
              <br />
              With
              <br />
              <span className="text-[#4AA8FF]">
                WILLS
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-gray-300 text-lg lg:text-xl leading-9">
              Luxury real estate marketing company helping investors
              discover premium projects with flexible payment plans and
              the best investment opportunities in Egypt.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-12">

              <Link
                href="#projects"
                className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-10 py-5 font-semibold text-lg transition duration-300 hover:scale-105 shadow-xl"
              >
                Explore Projects
              </Link>

              <a
                href="https://wa.me/201154209198"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#071B44] rounded-2xl px-10 py-5 font-semibold text-lg transition duration-300"
              >
                WhatsApp
              </a>

            </div>

          </div>

          {/* Image */}

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">

            <div className="relative">

              <div className="absolute -inset-4 rounded-[40px] bg-sky-500/20 blur-3xl"></div>

              <Image
                src="/villa.jpg"
                alt="Luxury Villa"
                width={620}
                height={760}
                priority
                className="relative rounded-[35px] object-cover shadow-2xl w-full max-w-[560px] h-auto"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}