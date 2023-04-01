import { IsEmail, IsLowercase, IsString, Length } from "class-validator";

export class CreateUserDto {
  /**
   * @example "johndoe@gmail.com"
   */
  @IsEmail()
  @IsLowercase()
  @Length(0, 254)
  email: string;

  /**
   * @example "John Doe"
   */
  @IsString()
  @Length(3, 40)
  name: string;
}
