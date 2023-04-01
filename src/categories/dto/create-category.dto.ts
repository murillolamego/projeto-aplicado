import { IsLowercase, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  /**
   * @example "dog"
   */
  @IsString()
  @IsLowercase()
  @Length(3, 40)
  name: string;

  /**
   * @example "The dog is a domesticated descendant of the wolf. Also called the domestic dog, it is derived from the extinct Pleistocene wolf, and the modern wolf is the dog's nearest living relative. Dogs were the first species to be domesticated by hunter-gatherers over 15,000 years ago before the development of agriculture."
   */
  @IsString()
  @Length(10, 500)
  about: string;
}
