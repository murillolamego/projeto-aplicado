import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

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
    try {
      const users = await this.prisma.user.findMany();

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
}
