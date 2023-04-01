import { IsEmail, IsLowercase, IsString } from "class-validator";

export class CreateUserDto {
  /**
   * @example "johndoe@gmail.com"
   */
  @IsEmail()
  @IsLowercase()
  email: string;

  /**
   * @example "John Doe"
   */
  @IsString()
  name: string;
}
