import { IsLowercase, IsString, Length } from "class-validator";
export class CreateProductDto {
  /**
   * @example "dog biscuit"
   */
  @IsString()
  @IsLowercase()
  @Length(3, 40)
  name: string;

  /**
   * @example "A dog biscuit is a hard, biscuit-based, dietary supplement for dogs or other canines, similar to human snack food."
   */
  @IsString()
  @Length(10, 500)
  about: string;
}
