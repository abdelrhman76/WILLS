"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();
  const params = useParams();

  const categoryId = params.id;

  const [title, setTitle] = useState("");
  const [developer, setDeveloper] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
const [coverImage, setCoverImage] = useState<File | null>(null);

const [gallery1, setGallery1] = useState<File | null>(null);

const [gallery2, setGallery2] = useState<File | null>(null);

const [gallery3, setGallery3] = useState<File | null>(null);
 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("developer", developer);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("whatsapp", whatsapp);
    formData.append("description", description);
    formData.append("categoryId", String(categoryId));

    if (coverImage) {
  formData.append("coverImage", coverImage);
}

if (gallery1) {
  formData.append("gallery1", gallery1);
}

if (gallery2) {
  formData.append("gallery2", gallery2);
}

if (gallery3) {
  formData.append("gallery3", gallery3);
}

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    router.push(`/admin/categories/${categoryId}`);
    router.refresh();
  }

  return (
    <div className="max-w-5xl">

      <h1 className="text-4xl font-bold text-[#071B44]">
        Add Project
      </h1>

      <p className="text-gray-500 mt-2 mb-10">
        Add a new project to this category
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-10 space-y-8"
      >

        <div>

          <label className="font-semibold">
            Project Title
          </label>

          <input
            className="w-full border rounded-xl p-4 mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Developer
            </label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Location
            </label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Price
            </label>

            <input
              type="text"
              inputMode="numeric"
              className="w-full border rounded-xl p-4 mt-2"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value.replace(/\D/g, ""))
              }
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              WhatsApp
            </label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows={6}
            className="w-full border rounded-xl p-4 mt-2 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>
<div className="grid md:grid-cols-2 gap-8">

  <div>

    <label className="font-semibold">
      Cover Image
    </label>

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      className="block mt-3"
      onChange={(e) => {

        if (!e.target.files) return;

        setCoverImage(e.target.files[0]);

      }}
    />

    {coverImage && (

      <p className="text-green-600 mt-2 text-sm">

        {coverImage.name}

      </p>

    )}

  </div>

  <div>

    <label className="font-semibold">
      Gallery Image 1
    </label>

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      className="block mt-3"
      onChange={(e) => {

        if (!e.target.files) return;

        setGallery1(e.target.files[0]);

      }}
    />

    {gallery1 && (

      <p className="text-green-600 mt-2 text-sm">

        {gallery1.name}

      </p>

    )}

  </div>

  <div>

    <label className="font-semibold">
      Gallery Image 2
    </label>

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      className="block mt-3"
      onChange={(e) => {

        if (!e.target.files) return;

        setGallery2(e.target.files[0]);

      }}
    />

    {gallery2 && (

      <p className="text-green-600 mt-2 text-sm">

        {gallery2.name}

      </p>

    )}

  </div>

  <div>

    <label className="font-semibold">
      Gallery Image 3
    </label>

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      className="block mt-3"
      onChange={(e) => {

        if (!e.target.files) return;

        setGallery3(e.target.files[0]);

      }}
    />

    {gallery3 && (

      <p className="text-green-600 mt-2 text-sm">

        {gallery3.name}

      </p>

    )}

  </div>

</div>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>

      </form>

    </div>
  );
}