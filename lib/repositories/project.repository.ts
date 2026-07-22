import { prisma } from "@/lib/prisma";

export class ProjectRepository {

  private generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");
  }

  async create(data: {
    title: string;
    location: string;
    developer: string;
    price: string;
    description: string;

    coverImage: string;

    gallery1?: string;
    gallery2?: string;
    gallery3?: string;

    whatsapp?: string;

    categoryId: number;
  }) {

    const slug = this.generateSlug(data.title);

    return await prisma.project.create({

      data: {

        title: data.title,

        slug,

        location: data.location,

        developer: data.developer,

        price: data.price,

        description: data.description,

        coverImage: data.coverImage,

        gallery1: data.gallery1,

        gallery2: data.gallery2,

        gallery3: data.gallery3,

        whatsapp: data.whatsapp,

        categoryId: data.categoryId,

      },

    });

  }

  async getAll() {

    return await prisma.project.findMany({

      include: {

        category: true,

        paymentPlans: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  async getByCategory(categoryId: number) {

    return await prisma.project.findMany({

      where: {

        categoryId,

      },

      include: {

        paymentPlans: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  async getById(id: number) {

    return await prisma.project.findUnique({

      where: {

        id,

      },

      include: {

        category: true,

        images: true,

        paymentPlans: {

          orderBy: {

            discount: "asc",

          },

        },

      },

    });

  }

  async getBySlug(slug: string) {

    return await prisma.project.findUnique({

      where: {

        slug,

      },

      include: {

        category: true,

        images: {

          orderBy: {

            id: "asc",

          },

        },

        paymentPlans: {

          orderBy: {

            discount: "asc",

          },

        },

      },

    });

  }

  async update(
    id: number,
    data: {
      title: string;
      location: string;
      developer: string;
      price: string;
      description: string;

      coverImage?: string;
      gallery1?: string;
      gallery2?: string;
      gallery3?: string;

      whatsapp?: string;
    }
  ) {

    const slug = this.generateSlug(data.title);

    const updateData: any = {

      title: data.title,

      slug,

      location: data.location,

      developer: data.developer,

      price: data.price,

      description: data.description,

      whatsapp: data.whatsapp,

    };

    if (data.coverImage) {
      updateData.coverImage = data.coverImage;
    }

    if (data.gallery1) {
      updateData.gallery1 = data.gallery1;
    }

    if (data.gallery2) {
      updateData.gallery2 = data.gallery2;
    }

    if (data.gallery3) {
      updateData.gallery3 = data.gallery3;
    }

    return await prisma.project.update({

      where: {
        id,
      },

      data: updateData,

    });

  }

  async delete(id: number) {

    await prisma.paymentPlan.deleteMany({
      where: {
        projectId: id,
      },
    });

    await prisma.image.deleteMany({
      where: {
        projectId: id,
      },
    });

    return await prisma.project.delete({

      where: {

        id,

      },

    });

  }

  async search(query: string) {

    return prisma.project.findMany({

      where: {

        OR: [

          {

            title: {

              contains: query,

            },

          },

          {

            location: {

              contains: query,

            },

          },

        ],

      },

      select: {

        id: true,

        title: true,

        slug: true,

        location: true,

      },

      take: 8,

    });

  }

  async getDashboardStats() {

    const [

      categories,

      projects,

      paymentPlans,

      featuredProjects,

    ] = await Promise.all([

      prisma.category.count(),

      prisma.project.count(),

      prisma.paymentPlan.count(),

      prisma.project.count({

        where: {

          featured: true,

        },

      }),

    ]);

    return {

      categories,

      projects,

      paymentPlans,

      featuredProjects,

    };

  }

}