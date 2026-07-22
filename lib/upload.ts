import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

async function saveFile(file: File, folder: string) {

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);
  console.log("File Name:", file.name);
console.log("File Size:", buffer.length);

  const extension = file.name.split(".").pop();

  const fileName = `${uuid()}.${extension}`;

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    folder
  );

  // لو الفولدر مش موجود اعمله
  await mkdir(uploadDir, {
    recursive: true,
  });

  const uploadPath = path.join(
    uploadDir,
    fileName
  );

  console.log(uploadPath);

  await writeFile(uploadPath, buffer);

  return `/uploads/${folder}/${fileName}`;
}

export async function uploadCategoryImage(file: File) {
  return saveFile(file, "categories");
}

export async function uploadProjectImage(file: File) {
  return saveFile(file, "projects");
}