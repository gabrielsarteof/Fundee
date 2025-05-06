import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('request-nonce')
  async getNonce(@Body() body: { address: string }) {
    return this.authService.requestNonce(body.address);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.verifySignature(loginDto.address, loginDto.signature);
  }
}
