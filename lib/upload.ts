import { v4 as uuid } from "uuid";
import { supabase } from "./supabase";

async function saveFile(file: File, folder: string) {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const extension = file.name.split(".").pop();

  const fileName = `${folder}/${uuid()}.${extension}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("uploads")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadCategoryImage(file: File) {
  return saveFile(file, "categories");
}

export async function uploadProjectImage(file: File) {
  return saveFile(file, "projects");
}