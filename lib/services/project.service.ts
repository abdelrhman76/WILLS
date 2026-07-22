import { ProjectRepository } from "@/lib/repositories/project.repository";

const repository = new ProjectRepository();

export class ProjectService {
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
    return repository.create(data);
  }

  async getAll() {
    return repository.getAll();
  }

  async getById(id: number) {
    return repository.getById(id);
  }

  async getByCategory(categoryId: number) {
    return repository.getByCategory(categoryId);
  }

  async getBySlug(slug: string) {
    return repository.getBySlug(slug);
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
  return repository.update(id, data);
}

  async delete(id: number) {
    return repository.delete(id);
  }
  async search(query: string) {
  return repository.search(query);
}
async getDashboardStats() {
  return repository.getDashboardStats();
}
}