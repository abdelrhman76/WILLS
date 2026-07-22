"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  title: string;
  slug: string;
  location: string;
};

export default function SearchBar() {
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim().length < 1) {
      setProjects([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      setProjects(data);
      setShowDropdown(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <section className="-mt-12 relative z-30 px-5">
      <div className="max-w-6xl mx-auto bg-white rounded-[30px] shadow-2xl p-6 lg:p-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* City */}

          <div>

            <label className="block text-sm font-semibold text-gray-500 mb-3">
              📍 City
            </label>

            <input
              type="text"
              value="Alexandria"
              readOnly
              className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-100 px-6 text-lg font-semibold text-[#071B44]"
            />

          </div>

          {/* Search */}

          <div
            ref={wrapperRef}
            className="relative"
          >

            <label className="block text-sm font-semibold text-gray-500 mb-3">
              🏢 Project
            </label>

            <input
              autoComplete="off"
              spellCheck={false}
              value={query}
              placeholder="Search Project..."
              onFocus={() => {
                if (projects.length > 0) {
                  setShowDropdown(true);
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-16 rounded-2xl border border-gray-200 px-6 text-lg outline-none transition duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />

            {showDropdown && (

              <div className="absolute left-0 right-0 top-full mt-3 bg-white rounded-2xl shadow-2xl border overflow-hidden max-h-80 overflow-y-auto">

                {projects.length > 0 ? (

                  projects.map((project) => (

                    <button
                      key={project.id}
                      onClick={() => {

                        setQuery(project.title);

                        setShowDropdown(false);

                        router.push(`/projects/${project.slug}`);

                      }}
                      className="w-full text-left px-6 py-5 hover:bg-sky-50 transition border-b last:border-none"
                    >

                      <h3 className="font-bold text-lg text-[#071B44]">
                        {project.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        📍 {project.location}
                      </p>

                    </button>

                  ))

                ) : (

                  <div className="px-6 py-5 text-gray-500">
                    No Projects Found
                  </div>

                )}

              </div>

            )}

          </div>

          {/* Search Button */}

          <div className="flex items-end">

            <button
              onClick={() => {

                if (projects.length > 0) {

                  router.push(`/projects/${projects[0].slug}`);

                }

              }}
              className="w-full h-16 rounded-2xl bg-[#4AA8FF] hover:bg-[#2D93F5] text-white text-lg font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              🔍 Search
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}