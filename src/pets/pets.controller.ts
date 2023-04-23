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
import { Pet, User } from "@prisma/client";

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
  create(@Body() createpetDto): Promise<Pet> {
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
   * Fetches all pets on the platform with their relations.
   */
  @Get("/relations")
  findAllWithRelations(): Promise<Pet[]> {
    return this.petsService.findAllWithRelations();
  }

  /**
   * Fetches all pets available for adoption on the platform with their relations.
   */
  @Get("/adoption")
  findAllAdoptionWithRelations(): Promise<Pet[]> {
    return this.petsService.findAllAdoptionWithRelations();
  }

  /**
   * Fetches all pets available for procreation on the platform with their relations.
   */
  @Get("/procreation")
  findAllProcreationWithRelations(): Promise<Pet[]> {
    return this.petsService.findAllProcreationWithRelations();
  }

  /**
   * Fetches pets of a given category on the platform.
   */
  @Get("/category/:id")
  findByCategory(@Param("id") id: string): Promise<Pet[]> {
    return this.petsService.findByCategory(id);
  }

  /**
   * Fetches pets of a given breed on the platform.
   */
  @Get("/breed/:id")
  findByBreed(@Param("id") id: string): Promise<Pet[]> {
    return this.petsService.findByBreed(id);
  }

  /**
   * Fetches a pet with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  /**
   * Fetches a pet with a given username on the platform.
   */
  @Get("/username/:username")
  findOneByUsername(@Param("username") username: string): Promise<Pet> {
    return this.petsService.findOneByUsername(username);
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

  /**
   * Fetches all pets following this user on the platform.
   */
  @Get(":id/followers")
  findFollowers(@Param("id") id: string): Promise<Pet[]> {
    return this.petsService.findFollowers(id);
  }

  /**
   * Fetches all pets followed by this pet on the platform.
   */
  @Get(":id/follows")
  findFollowing(@Param("id") id: string): Promise<Pet[]> {
    return this.petsService.findFollowing(id);
  }

  /**
   * Fetches all users following this pet on the platform.
   */
  @Get(":id/followers/users")
  findUserFollowers(@Param("id") id: string): Promise<User[]> {
    return this.petsService.findUserFollowers(id);
  }
}
