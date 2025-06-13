import { Controller, Post, Body, Req, Res, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@/dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

@Controller()
export default class AuthController {
  public authService = new AuthService();

  @Post('/signup')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  async signUp(@Body() player_data: CreateUserDto, @Res() res: Response) {
    const { cookie, user, token_data } = await this.authService.signup(player_data);
    res.setHeader('Set-Cookie', [cookie]);

    return res.json({ data: user, message: 'signup', token: token_data });
  }

  @Post('/login')
  @UseBefore(validationMiddleware(LoginUserDto, 'body'))
  async logIn(@Body() player_data: LoginUserDto, @Res() res: Response) {
    const { cookie, find_user, token_data } = await this.authService.login(player_data);

    res.setHeader('Set-Cookie', [cookie]);
    return res.json({ data: find_user, message: 'login', token: token_data });
  }

  @Post('/logout')
  @UseBefore(authMiddleware)
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const player_data: User = req.user;
    const logout_user_data: User = await this.authService.logout(player_data);
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return res.json({ data: logout_user_data, message: 'logout' });
  }
}
