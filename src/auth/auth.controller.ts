import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AccessTokenGuard } from "./accessToken.guard";
import { AuthService, IAuthPayload } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RefreshTokenGuard } from "./refreshToken.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Sign in into the platform.
   */
  @Post("login")
  signIn(@Body() authDto: AuthDto): Promise<IAuthPayload> {
    return this.authService.signIn(authDto);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get("logout")
  logout(@Req() req: { user: Record<string, string> }): void {
    this.authService.logout(req.user["sub"]);
  }

  /**
   * Refreshes user token to access the platform.
   */
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Get("refresh")
  refreshTokens(
    @Req()
    req: {
      user: Record<string, string>;
    },
  ): Promise<IAuthPayload> {
    const id = req.user["sub"];
    const refreshToken = req.user["refreshToken"];
    return this.authService.refreshTokens(id, refreshToken);
  }
}
