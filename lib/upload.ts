import { v4 as uuid } from "uuid";
import { supabase } from "./supabase";

async function saveFile(file: File, folder: string) {
  try {
    const extension = file.name.split(".").pop();
    const fileName = `${folder}/${uuid()}.${extension}`;

    console.log("==================================");
    console.log("Uploading file...");
    console.log("Bucket: uploads");
    console.log("File Name:", fileName);
    console.log("File Size:", file.size);
    console.log("File Type:", file.type);

    const result = await supabase.storage
      .from("uploads")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    console.log("Upload Result:", result);

    if (result.error) {
      console.error("Supabase Upload Error:", result.error);
      throw result.error;
    }

    const { data } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    console.log("Public URL:", data.publicUrl);

    return data.publicUrl;
  } catch (error) {
    console.error("UPLOAD FAILED:", error);
    throw error;
  }
}

export async function uploadCategoryImage(file: File) {
  return saveFile(file, "categories");
}

export async function uploadProjectImage(file: File) {
  return saveFile(file, "projects");
}