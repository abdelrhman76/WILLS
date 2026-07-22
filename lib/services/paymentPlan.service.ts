import { PaymentPlanRepository } from "@/lib/repositories/paymentPlan.repository";

const repository = new PaymentPlanRepository();

export class PaymentPlanService {

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

    return await repository.create(data);

  }

  async getByProject(projectId: number) {
    return await repository.getByProject(projectId);
  }

  async getById(id: number) {
    return await repository.getById(id);
  }

  async delete(id: number) {
    return await repository.delete(id);
  }

}
