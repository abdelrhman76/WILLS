import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("123456", 10);

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashed,
    },
  });

  console.log("✅ Admin Created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });