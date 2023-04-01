import { IsLowercase, IsString, IsUUID, Length } from "class-validator";

export class CreateBreedDto {
  /**
   * @example "french-bulldog"
   */
  @IsString()
  @IsLowercase()
  @Length(3, 40)
  name: string;

  /**
   * @example "The French Bulldog, French: Bouledogue Français, is a French breed of companion dog or toy dog. It appeared in Paris in the mid-nineteenth century, apparently the result of cross-breeding of Toy Bulldogs imported from England and local Parisian ratters."
   */
  @IsString()
  @Length(10, 500)
  about: string;

  /**
   * @example "UUID"
   */
  @IsUUID()
  categoryId: string;
}
