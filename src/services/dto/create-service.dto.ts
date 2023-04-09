import { IsLowercase, IsString, Length } from "class-validator";
export class CreateServiceDto {
  /**
   * @example "groom"
   */
  @IsString()
  @IsLowercase()
  @Length(3, 40)
  name: string;

  /**
   * @example "Pet grooming refers to both the hygienic care and cleaning of a pet."
   */
  @IsString()
  @Length(10, 500)
  about: string;
}
