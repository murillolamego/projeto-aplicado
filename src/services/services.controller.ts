import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { Service } from "@prisma/client";

import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServicesService } from "./services.service";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * Creates a service on the platform.
   */
  @Post()
  create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  /**
   * Fetches all services on the platform.
   */
  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  /**
   * Fetches a service with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  /**
   * Updates a service with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  /**
   * Deletes a service with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Service> {
    return this.servicesService.remove(id);
  }
}
