import {
  IsEmail,
  IsLowercase,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";
export class CreateCompanyDto {
  /**
   * @example "contact@mycompany.com"
   */
  @IsEmail()
  @IsLowercase()
  @Length(0, 254)
  email: string;

  /**
   * @example "Pretty Paw - Pet Shop"
   */
  @IsString()
  @Length(3, 40)
  name: string;

  /**
   * @example "Strong password"
   */
  @IsStrongPassword()
  password: string;

  /**
   * @example "New York"
   */
  @IsString()
  @Length(0, 60)
  city: string;

  /**
   * @example "NY"
   */
  @IsOptional()
  @IsString()
  @Length(0, 60)
  state?: string;

  /**
   * @example "United States of America"
   */
  @IsString()
  @Length(0, 60)
  country: string;
}
