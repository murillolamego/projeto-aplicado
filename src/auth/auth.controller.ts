import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthService, IAuthPayload } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { AccessTokenGuard } from "./guards/accessToken.guard";
import { RefreshTokenGuard } from "./guards/refreshToken.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Sign in into the platform.
   */
  @Post("signin")
  signIn(@Body() authDto: AuthDto): Promise<IAuthPayload> {
    return this.authService.signIn(authDto);
  }

  /**
   * Sign out from the platform.
   */
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get("signout")
  signOut(@Req() req: { user: Record<string, string> }): void {
    this.authService.signOut(req.user["sub"]);
  }

  /**
   * Refresh user tokens to mantain access to the platform.
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
