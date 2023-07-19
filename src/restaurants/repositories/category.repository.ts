import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryRepository {
  constructor(private dataSource: DataSource) {
    // super(Category, dataSource.createEntityManager());
  }
  async getOrCreate(name: string): Promise<Category> {
    const categoryRepository = this.dataSource.getRepository(Category)
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    console.log('---------------------------3')
    let category = await categoryRepository.findOne({ where: { slug: categorySlug } });
    console.log('---------------------------4')
    if (!category) {
      category = await categoryRepository.save(categoryRepository.create({ slug: categorySlug, name: categoryName }))
    }
    return category
  }
}