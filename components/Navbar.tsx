"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { poppins } from "@/lib/fonts";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo1.png"
            alt="WILLS Logo"
            width={145}
            height={70}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <ul
          className={`${poppins.className} hidden lg:flex items-center gap-10 text-[17px] font-semibold text-slate-700`}
        >
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="relative transition duration-300 hover:text-sky-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <a
          href="https://wa.me/201154209198"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
        >
          Contact Us
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1"
        >
          <span className="w-7 h-1 bg-[#071B44] rounded"></span>
          <span className="w-7 h-1 bg-[#071B44] rounded"></span>
          <span className="w-7 h-1 bg-[#071B44] rounded"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col p-6 gap-5">

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-[#071B44] hover:text-sky-500"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://wa.me/201154209198"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 bg-sky-500 text-center text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition"
            >
              Contact Us
            </a>

          </div>
        </div>
      )}
    </nav>
  );
}