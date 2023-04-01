import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      console.log(
        `The email, '${createUserDto.email}' is already associated with an account.`,
      );
      throw new HttpException(
        `The email, '${createUserDto.email}' is already associated with an account.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = 10;

    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating user.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
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
}
