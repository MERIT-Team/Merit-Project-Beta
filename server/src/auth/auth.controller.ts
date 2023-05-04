import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/singup.dto';
import { SigninDto } from './dto/signin.dto';
import { CreateOTPDto } from './dto/createOTP.dto';
import { CheckOTPDto } from './dto/checkOTP.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() signupDto: SigninDto) {
    return this.authService.signin(signupDto);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    console.log(signupDto);

    return this.authService.signup(signupDto);
  }

  @Post('/otp/signin')
  siginOTP(@Body() createOTPDto: CreateOTPDto) {
    return this.authService.createOTP(createOTPDto);
  }

  @Post('/otp/signin/verify')
  siginOTPConfirm(@Body() checkOTPDto: CheckOTPDto) {
    return this.authService.verifyOTP(checkOTPDto);
  }
}