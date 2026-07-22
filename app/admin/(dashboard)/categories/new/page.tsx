"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (Number(minPrice) >= Number(maxPrice)) {
      setError("Minimum price must be less than maximum price.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("minPrice", minPrice);
    formData.append("maxPrice", maxPrice);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <div className="max-w-3xl">

      <h1 className="text-4xl font-bold text-[#071B44]">
        Add Category
      </h1>

      <p className="text-gray-500 mt-2 mb-10">
        Create a new budget category
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-10 space-y-6"
      >

        {/* Name */}

        <div>

          <label className="font-semibold">
            Category Name
          </label>

          <input
            className="w-full border rounded-xl p-4 mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

        </div>

        {/* Prices */}

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Minimum Price
            </label>

            <input
              type="text"
              inputMode="numeric"
              className="w-full border rounded-xl p-4 mt-2"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value.replace(/\D/g, ""))
              }
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Maximum Price
            </label>

            <input
              type="text"
              inputMode="numeric"
              className="w-full border rounded-xl p-4 mt-2"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value.replace(/\D/g, ""))
              }
              required
            />

          </div>

        </div>

        {/* Description */}

        <div>

          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            className="w-full border rounded-xl p-4 mt-2 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>

        {/* Banner */}

        <div>

          <label className="font-semibold block mb-3">
            Banner Image
          </label>

          <div className="relative">

            <label
              htmlFor="bannerImage"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sky-400 bg-sky-50 hover:bg-sky-100 transition overflow-hidden"
            >

              {preview ? (

                <div className="relative w-full h-full">

                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(null);
                      setPreview("");
                    }}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold shadow-lg"
                  >
                    ×
                  </button>

                </div>

              ) : (

                <>

                  <div className="text-6xl">
                    📷
                  </div>

                  <p className="mt-4 text-lg font-semibold">
                    Click to upload banner
                  </p>

                  <p className="text-gray-500">
                    JPG • JPEG • PNG • WEBP
                  </p>

                </>

              )}

            </label>

            <input
              id="bannerImage"
              type="file"
              hidden
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (!file) return;

                if (!file.type.startsWith("image/")) {
                  alert("Please choose an image.");
                  return;
                }

                setImage(file);
                setPreview(URL.createObjectURL(file));

              }}
            />

          </div>

          {image && (
            <p className="text-green-600 mt-3">
              Selected: {image.name}
            </p>
          )}

        </div>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white px-8 py-4 rounded-2xl font-semibold transition"
        >
          {loading ? "Saving..." : "Save Category"}
        </button>

      </form>

    </div>
  );
}