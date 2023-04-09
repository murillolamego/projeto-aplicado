import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Service } from "@prisma/client";

import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create({ name, about }: CreateServiceDto): Promise<Service> {
    const serviceExists = await this.prisma.service.findFirst({
      where: {
        name: name,
      },
    });

    if (serviceExists) {
      console.log(
        `The service, \'${name}\', already exists with the id: ${serviceExists.id}`,
      );
      throw new HttpException(
        `The service, \'${name}\', already exists with the id: ${serviceExists.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const service = await this.prisma.service.create({
        data: {
          name,
          about,
        },
      });

      return service;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating service.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Service[]> {
    const maxReturnServices = 1000;

    try {
      const categories = await this.prisma.service.findMany({
        orderBy: { name: "asc" },
        take: maxReturnServices,
      });

      return categories;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching categories.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Service> {
    try {
      const service = await this.prisma.service.findFirst({
        where: {
          id,
        },
      });

      return service;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching service.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    try {
      const service = await this.prisma.service.update({
        where: {
          id,
        },
        data: updateServiceDto,
      });

      return service;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating service.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Service> {
    try {
      const service = await this.prisma.service.delete({
        where: {
          id,
        },
      });

      return service;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting service.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
