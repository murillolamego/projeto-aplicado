import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { AuthDto } from "./dto/auth.dto";

export interface IAuthPayload {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signIn({ email, password }: AuthDto): Promise<IAuthPayload> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      console.log("Auth error.");
      throw new HttpException("Auth error.", HttpStatus.UNAUTHORIZED);
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated) {
      console.log("Auth error.");
      throw new HttpException("Auth error.", HttpStatus.UNAUTHORIZED);
    }

    delete user.password;

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    let hashedRefreshToken: string;

    const saltRounds = 10;

    try {
      hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    } catch (e) {
      console.log(e.message);
      throw new HttpException("Auth error.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          refreshToken: hashedRefreshToken,
        },
      });
    } catch (e) {
      console.log(e.message);
      throw new HttpException("Auth error.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTokens(id: string, email: string): Promise<IAuthPayload> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwt.signAsync(
          {
            sub: id,
            email,
          },
          {
            secret: this.config.get<string>("JWT_ACCESS_SECRET"),
            expiresIn: "30s",
          },
        ),
        this.jwt.signAsync(
          {
            sub: id,
            email,
          },
          {
            secret: this.config.get<string>("JWT_REFRESH_SECRET"),
            expiresIn: "7d",
          },
        ),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Access denied.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshTokens(id: string, refreshToken: string): Promise<IAuthPayload> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user || !user.refreshToken) {
      console.log("Access denied.");
      throw new HttpException("Access denied.", HttpStatus.UNAUTHORIZED);
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      console.log("Access denied.");
      throw new HttpException("Access denied.", HttpStatus.FORBIDDEN);
    }

    delete user.password;

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    // res.setCookie(
    //   "jwt",
    //   { tokens },
    //   {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "Strict", // or 'Lax', it depends
    //     maxAge: 604800000, // 7 days
    //   },
    // );

    return tokens;
  }
}
