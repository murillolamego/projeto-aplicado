import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Company } from "@prisma/client";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create({
    email,
    name,
    password,
    city,
    state,
    country,
  }: CreateCompanyDto): Promise<Company> {
    const companyExists = await this.prisma.company.findFirst({
      where: {
        email: email,
      },
    });

    if (companyExists) {
      console.log(
        `The email, '${email}' is already associated with an account.`,
      );
      throw new HttpException(
        `The email, '${email}' is already associated with an account.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = 10;

    try {
      password = await bcrypt.hash(password, saltRounds);
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating company.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const company = await this.prisma.company.create({
        data: {
          email,
          name,
          password,
          enabled: false, // Enabled after verification
          Address: {
            create: {
              city,
              state,
              country,
            },
          },
        },
      });

      delete company.password;

      return company;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating company.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Company[]> {
    const maxReturnCompanies = 1000;

    try {
      const companies = await this.prisma.company.findMany({
        orderBy: { email: "asc" },
        take: maxReturnCompanies,
      });

      return companies;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching companies.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Company> {
    try {
      const company = await this.prisma.company.findFirst({
        where: {
          id,
        },
      });

      return company;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching company.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    try {
      const company = await this.prisma.company.update({
        where: {
          id,
        },
        data: updateCompanyDto,
      });

      return company;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating company.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Company> {
    const companyExists = await this.prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!companyExists) {
      throw new HttpException(
        "Company not found",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const company = await this.prisma.company.delete({
        where: {
          id,
        },
      });

      return company;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting company.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
