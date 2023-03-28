import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  /**
   * @example "johndoe@gmail.com"
   */
  @IsEmail()
  email: string;

  /**
   * @example "John Doe"
   */
  @IsString()
  name: string;
}
