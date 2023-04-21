import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma.service";
import { Breed } from "src/breeds/entities/breed.entity";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Pet, User } from "@prisma/client";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password, file, country, state, city }) {
    // TODO validate fields and values

    const userExists = await this.prisma.user.findFirst({
      where: {
        email: email.value,
      },
    });

    if (userExists) {
      console.log(
        `The email, '${email.value}' is already associated with an account.`,
      );
      throw new HttpException(
        `The email, '${email.value}' is already associated with an account.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = 10;

    try {
      password.value = await bcrypt.hash(password.value, saltRounds);
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating user.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          email: email.value,
          name: name.value,
          password: password.value,
          avatar: file?.filepath,
          enabled: true,
          Address: {
            create: {
              city: city?.value,
              state: state?.value,
              country: country.value,
            },
          },
        },
      });

      delete user.password;

      return user;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating user.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    const maxReturnUsers = 1000;

    try {
      const users = await this.prisma.user.findMany({
        orderBy: { email: "asc" },
        take: maxReturnUsers,
      });

      users.forEach((user) => {
        delete user.password;
      });

      return users;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching users.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      delete user.password;

      return user;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching user.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });

      return user;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating user.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<User> {
    const userExists = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException(
        "User not found",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting user.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPets(id: string): Promise<Pet[]> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          pets: {
            orderBy: { categoryId: "asc" },
            include: {
              Category: true,
              Breed: true,
            },
          },
        },
      });

      return user.pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching user pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findFollowing(id: string): Promise<Pet[]> {
    try {
      const pets = await this.prisma.pet.findMany({
        where: {
          userFollowers: {
            some: {
              followerId: id,
            },
          },
        },
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching followed pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async followPet(followerId: string, followingId: string): Promise<boolean> {
    try {
      await this.prisma.userFollows.create({
        data: {
          followerId,
          followingId,
        },
      });

      return true;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching followed pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
