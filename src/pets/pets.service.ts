import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Pet } from "@prisma/client";

import { UpdatePetDto } from "./dto/update-pet.dto";

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create({
    username,
    name,
    birthdate,
    file,
    categoryId,
    breedId,
    guardianId,
  }): Promise<Pet> {
    // TODO validate fields and values
    const petExists = await this.prisma.pet.findFirst({
      where: {
        username: username.value,
      },
    });

    if (petExists) {
      console.log(
        `The username \'${username.value}\' is already associated with an account.`,
      );
      throw new HttpException(
        `The username \'${username.value}\' is already associated with an account.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryExists = await this.prisma.category.findFirst({
      where: {
        id: categoryId.value,
      },
      include: {
        breeds: true,
      },
    });

    if (!categoryExists) {
      console.log("This category of pet is not available.");
      throw new HttpException(
        "This category of pet is not available.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const breedExists = categoryExists.breeds.find((breed) => {
      return breed.id === breedId.value;
    });

    if (!breedExists) {
      console.log(`This breed of ${categoryExists.name} is not available.`);
      throw new HttpException(
        `This breed of ${categoryExists.name} is not available.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const guardianExists = await this.prisma.user.findFirst({
      where: {
        id: guardianId.value,
      },
    });

    if (!guardianExists) {
      console.log("Could not find pet guardian.");
      throw new HttpException(
        "Could not find pet guardian.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const birthdateDatetime = new Date(birthdate.value);

    try {
      const pet = await this.prisma.pet.create({
        data: {
          username: username.value,
          name: name.value,
          birthdate: birthdateDatetime,
          avatar: file?.filepath,
          categoryId: categoryId.value,
          breedId: breedId.value,
          guardianId: guardianId.value,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        orderBy: { username: "asc" },
        take: maxReturnPets,
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllWithRelations(): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        orderBy: { username: "asc" },
        take: maxReturnPets,
        include: {
          Category: true,
          Breed: true,
          Guardian: true,
        },
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCategory(categoryId: string): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        where: {
          categoryId,
        },
        orderBy: { username: "asc" },
        take: maxReturnPets,
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByBreed(breedId: string): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        where: {
          breedId,
        },
        orderBy: { username: "asc" },
        take: maxReturnPets,
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.findFirst({
        where: {
          id,
        },
        include: {
          Category: true,
          Breed: true,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByUsername(username: string): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.findFirst({
        where: {
          username,
        },
        include: {
          Category: true,
          Breed: true,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.update({
        where: {
          id,
        },
        data: updatePetDto,
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.delete({
        where: {
          id,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
