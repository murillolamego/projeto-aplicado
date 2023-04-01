import { IsInt, IsString } from "class-validator";

export class CreatePetDto {
  /**
   * @example "petrock"
   */
  @IsString()
  username: string;

  /**
   * @example "Pet Rock"
   */
  @IsString()
  name: string;

  /**
   * @example "5"
   */
  @IsInt()
  age: number;

  /**
   * @example "UUID"
   */
  @IsString()
  categoryId: string;

  /**
   * @example "UUID"
   */
  @IsString()
  breedId: string;

  /**
   * @example "UUID"
   */
  @IsString()
  guardianId: string;
}