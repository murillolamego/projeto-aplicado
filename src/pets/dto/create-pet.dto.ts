import {
  IsAlphanumeric,
  IsDateString,
  IsLowercase,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class CreatePetDto {
  /**
   * @example "petrock"
   */
  @IsAlphanumeric()
  @IsLowercase()
  @Length(3, 20)
  username: string;

  /**
   * @example "Pet Rock"
   */
  @IsString()
  @Length(3, 40)
  name: string;

  /**
   * @example "01/01/2021"
   */
  @IsDateString()
  birthdate: string;

  avatar?: string;

  /**
   * @example "UUID"
   */
  @IsUUID()
  categoryId: string;

  /**
   * @example "UUID"
   */
  @IsUUID()
  breedId: string;

  /**
   * @example "UUID"
   */
  @IsUUID()
  guardianId: string;
}
