import { CategoryRepository } from "@/lib/repositories/category.repository";

const repository = new CategoryRepository();

export interface CreateCategoryDto {
  name: string;
  minPrice: number;
  maxPrice: number;
  description?: string;
  bannerImage?: string;
}

export class CategoryService {

  async getAll() {
    return repository.getAll();
  }

  async create(data: CreateCategoryDto) {
    return repository.create(data);
  }
async update(
  id: number,
  data: CreateCategoryDto
) {

  return repository.update(id, data);

}
  async delete(id: number) {
    return repository.delete(id);
  }

}