import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Pet, User } from "@prisma/client";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a user on the platform.
   */
  @Post()
  @ApiConsumes("multipart/form-data")
  create(@Body() createUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Fetches all users on the platform.
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Fetches a user with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Updates a user with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Deletes a user with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  /**
   * Fetches all user pets on the platform.
   */
  @Get(":id/pets")
  findPets(@Param("id") id: string): Promise<Pet[]> {
    return this.usersService.findPets(id);
  }

  /**
   * Fetches all pets followed by user on the platform.
   */
  @Get(":id/follows")
  findFollows(@Param("id") id: string): Promise<Pet[]> {
    return this.usersService.findFollowing(id);
  }

  /**
   * Follows a pet on the platform.
   */
  @Post(":followerid/follow/:followingid")
  followPet(
    @Param("followerid") followerId: string,
    @Param("followingid") followingId: string,
  ): Promise<boolean> {
    return this.usersService.followPet(followerId, followingId);
  }
}
