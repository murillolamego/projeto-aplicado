import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Category } from "@prisma/client";

import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Creates a category on the platform.
   */
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  /**
   * Fetches all categories on the platform.
   */
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  /**
   * Fetches a category with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  /**
   * Updates a category with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  /**
   * Deletes a category with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
