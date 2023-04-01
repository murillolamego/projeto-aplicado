import {
  IsEmail,
  IsLowercase,
  IsStrongPassword,
  Length,
} from "class-validator";

export class AuthDto {
  /**
   * @example "johndoe@gmail.com"
   */
  @IsEmail()
  @IsLowercase()
  @Length(0, 254)
  email: string;

  /**
   * @example "Strong password"
   */
  @IsStrongPassword()
  password: string;
}
