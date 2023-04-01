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
import { Pet } from "@prisma/client";

import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { PetsService } from "./pets.service";

@ApiTags("pets")
@Controller("pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  /**
   * Creates a pet on the platform.
   */
  @Post()
  create(@Body() createpetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createpetDto);
  }

  /**
   * Fetches all pets on the platform.
   */
  @Get()
  findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  /**
   * Fetches a pet with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  /**
   * Updates a pet with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatepetDto: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.update(id, updatepetDto);
  }

  /**
   * Deletes a pet with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Pet> {
    return this.petsService.remove(id);
  }
}