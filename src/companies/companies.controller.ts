import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { Company } from "@prisma/client";

import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  /**
   * Creates a company on the platform.
   */
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  /**
   * Fetches all companies on the platform.
   */
  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  /**
   * Fetches a company with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  /**
   * Updates a company with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(id, updateCompanyDto);
  }

  /**
   * Deletes a company with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Company> {
    return this.companiesService.remove(id);
  }
}
