import { prisma } from "@/lib/prisma";

export class PaymentPlanRepository {

  async create(data: {
    title: string;

    paymentType: string;

    years: number;

    originalPrice: number;

    discount: number;

    discountAmount: number;

    newPrice: number;

    downPayment: number;

    secondPayment?: number | null;

    remainingAmount: number;

    installmentCount: number;

    installmentValue: number;

    projectId: number;
  }) {

    return await prisma.paymentPlan.create({

      data: {

        title: data.title,

        paymentType: data.paymentType,

        years: data.years,

        originalPrice: data.originalPrice,

        discount: data.discount,

        discountAmount: data.discountAmount,

        newPrice: data.newPrice,

        downPayment: data.downPayment,

        secondPayment: data.secondPayment,

        remainingAmount: data.remainingAmount,

        installmentCount: data.installmentCount,

        installmentValue: data.installmentValue,

        projectId: data.projectId,

      },

    });

  }

  async getByProject(projectId: number) {

    return await prisma.paymentPlan.findMany({

      where: {
        projectId,
      },

      orderBy: {
        years: "asc",
      },

    });

  }

  async getById(id: number) {

    return await prisma.paymentPlan.findUnique({

      where: {
        id,
      },

    });

  }

  async delete(id: number) {

    return await prisma.paymentPlan.delete({

      where: {
        id,
      },

    });

  }

}