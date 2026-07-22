import { prisma } from "@/lib/prisma";
import { CreateCategoryDto } from "../services/category.service";

export class CategoryRepository {

  async getAll() {
  return prisma.category.findMany({
    include: {
      projects: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

  async create(data: CreateCategoryDto) {

    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return prisma.category.create({

      data: {

        name: data.name,

        slug,

        minPrice: data.minPrice,

        maxPrice: data.maxPrice,

        description: data.description,

        bannerImage: data.bannerImage,

      },

    });

  }
  async update(
  id: number,
  data: CreateCategoryDto
) {

  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return prisma.category.update({

    where: {
      id,
    },

    data: {

      name: data.name,

      slug,

      minPrice: data.minPrice,

      maxPrice: data.maxPrice,

      description: data.description,

      bannerImage: data.bannerImage,

    },

  });

}

  async delete(id: number) {

    return prisma.category.delete({

      where: {
        id,
      },

    });

  }

}