"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const inputStyle =
  "w-full border rounded-xl p-4 mt-2 outline-none focus:ring-2 focus:ring-sky-300";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const categoryId = params.id as string;
  const projectId = params.projectId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreview1, setGalleryPreview1] = useState("");
  const [galleryPreview2, setGalleryPreview2] = useState("");
  const [galleryPreview3, setGalleryPreview3] = useState("");

  useEffect(() => {
    loadProject();
  }, []);

  async function loadProject() {
    const res = await fetch(`/api/projects/${projectId}`);

    const data = await res.json();

    setTitle(data.title);
    setDeveloper(data.developer);
    setLocation(data.location);
    setPrice(data.price);
    setWhatsapp(data.whatsapp ?? "");
    setDescription(data.description);

    setCoverPreview(data.coverImage);
    setGalleryPreview1(data.gallery1 ?? "");
    setGalleryPreview2(data.gallery2 ?? "");
    setGalleryPreview3(data.gallery3 ?? "");

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="text-center py-40 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-5xl font-bold text-[#071B44] mb-10">
        Edit Project
      </h1>

      <form className="bg-white rounded-3xl shadow-xl p-10 space-y-8">

        <div>

          <label className="font-semibold">
            Project Title
          </label>

          <input
            className={inputStyle}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Developer
            </label>

            <input
              className={inputStyle}
              value={developer}
              onChange={(e)=>setDeveloper(e.target.value)}
            />

          </div>

          <div>

            <label className="font-semibold">
              Location
            </label>

            <input
              className={inputStyle}
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Price
            </label>

            <input
              className={inputStyle}
              value={price}
              onChange={(e)=>setPrice(e.target.value.replace(/\D/g,""))}
            />

          </div>

          <div>

            <label className="font-semibold">
              WhatsApp
            </label>

            <input
              className={inputStyle}
              value={whatsapp}
              onChange={(e)=>setWhatsapp(e.target.value)}
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows={6}
            className="w-full border rounded-xl p-4 mt-2"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

        </div>

        <div className="grid grid-cols-2 gap-8">

          <div>

            <label className="font-semibold">
              Cover Image
            </label>

            {coverPreview && (

              <img
                src={coverPreview}
                className="mt-3 h-48 rounded-xl object-cover"
              />

            )}

            <input
              type="file"
              className="mt-4"
              onChange={(e)=>{
                if(!e.target.files) return;
                setCoverImage(e.target.files[0]);
              }}
            />

          </div>

          <div>

            <label className="font-semibold">
              Gallery Image 1
            </label>

            {galleryPreview1 && (
              <img
                src={galleryPreview1}
                className="mt-3 h-48 rounded-xl object-cover"
              />
            )}

            <input
              type="file"
              className="mt-4"
              onChange={(e)=>{
                if(!e.target.files) return;
                setGallery1(e.target.files[0]);
              }}
            />

          </div>

          <div>

            <label className="font-semibold">
              Gallery Image 2
            </label>

            {galleryPreview2 && (
              <img
                src={galleryPreview2}
                className="mt-3 h-48 rounded-xl object-cover"
              />
            )}

            <input
              type="file"
              className="mt-4"
              onChange={(e)=>{
                if(!e.target.files) return;
                setGallery2(e.target.files[0]);
              }}
            />

          </div>

          <div>

            <label className="font-semibold">
              Gallery Image 3
            </label>

            {galleryPreview3 && (
              <img
                src={galleryPreview3}
                className="mt-3 h-48 rounded-xl object-cover"
              />
            )}

            <input
              type="file"
              className="mt-4"
              onChange={(e)=>{
                if(!e.target.files) return;
                setGallery3(e.target.files[0]);
              }}
            />

          </div>

        </div>
                <div className="flex justify-center pt-8">

          <button
            type="button"
            disabled={saving}
            onClick={async () => {

              setSaving(true);

              const formData = new FormData();

              formData.append("title", title);
              formData.append("developer", developer);
              formData.append("location", location);
              formData.append("price", price);
              formData.append("whatsapp", whatsapp);
              formData.append("description", description);

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

              const res = await fetch(`/api/projects/${projectId}`, {

                method: "PUT",

                body: formData,

              });

              setSaving(false);

              if (!res.ok) {

                alert("Failed To Update Project");

                return;

              }

              router.push(`/admin/categories/${categoryId}`);

              router.refresh();

            }}
            className="
            bg-sky-500
            hover:bg-sky-600
            text-white
            font-bold
            px-10
            py-4
            rounded-2xl
            transition
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </form>

    </div>

  );

}
