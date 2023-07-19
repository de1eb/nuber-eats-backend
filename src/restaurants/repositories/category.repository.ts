import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryRepository {
  constructor(private dataSource: DataSource) {
    // super(Category, dataSource.createEntityManager());
  }
  categoryRepository = this.dataSource.getRepository(Category)
  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.categoryRepository.findOne({ where: { slug: categorySlug } });
    if (!category) {
      category = await this.categoryRepository.save(this.categoryRepository.create({ slug: categorySlug, name: categoryName }))
    }
    return category
  }
}