import { ExtractJwt, Strategy } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

interface IRefreshPayload {
  sub: string;
  email: string;
  iat: string;
  exp: string;
  refreshToken?: string;
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("JWT_REFRESH_SECRET"),
      passReqToCallback: true,
    });
  }

  validate(
    req: { headers: Record<string, string> },
    payload: IRefreshPayload,
  ): IRefreshPayload {
    const refreshToken = req?.headers?.authorization
      .replace("Bearer", "")
      .trim();
    return { ...payload, refreshToken };
  }
}
