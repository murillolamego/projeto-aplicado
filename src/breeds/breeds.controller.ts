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
import { Breed } from "@prisma/client";

import { BreedsService } from "./breeds.service";
import { CreateBreedDto } from "./dto/create-breed.dto";
import { UpdateBreedDto } from "./dto/update-breed.dto";

@ApiTags("breeds")
@Controller("breeds")
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  /**
   * Creates a breed on the platform.
   */
  @Post()
  create(@Body() createBreedDto: CreateBreedDto): Promise<Breed> {
    return this.breedsService.create(createBreedDto);
  }

  /**
   * Fetches all breeds on the platform.
   */
  @Get()
  findAll(): Promise<Breed[]> {
    return this.breedsService.findAll();
  }

  /**
   * Fetches all breeds on the platform.
   */
  @Get("/category/:id")
  findAllByCategory(@Param("id") id): Promise<Breed[]> {
    return this.breedsService.findAllByCategory(id);
  }

  /**
   * Fetches a breed with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Breed> {
    return this.breedsService.findOne(id);
  }

  /**
   * Updates a breed with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBreedDto: UpdateBreedDto,
  ): Promise<Breed> {
    return this.breedsService.update(id, updateBreedDto);
  }

  /**
   * Deletes a breed with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Breed> {
    return this.breedsService.remove(id);
  }
}
