import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@/dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import { isEmpty } from '@utils/util';
import MainService from '@/services/main.service';

//service
import UserService from '@/services/users.service';

class AuthService extends MainService {
  public userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  public async signup(user_data: CreateUserDto): Promise<{ cookie: string; user: User; token_data: object }> {
    if (isEmpty(user_data)) throw new HttpException(400, 'User data is invalid');

    const find_user: User = await this.userService.findUserByEmail(user_data.email);
    if (find_user) throw new HttpException(409, `You're email ${user_data.email} already exists`);

    const create_user_data: User = await this.userService.createUser(user_data);

    const user: User = await this.userService.findUserByEmail(create_user_data.email, false);
    const token_data = this.createToken(user);
    const cookie = this.createCookie(token_data);
    return { cookie, user, token_data };
  }

  public async login(user_data: LoginUserDto): Promise<{ cookie: string; find_user: User; token_data: object }> {
    if (isEmpty(user_data)) throw new HttpException(400, 'User data is invalid');

    const find_user: User = await this.userService.findUserByUsername(user_data.username, true);
    if (!find_user) throw new HttpException(409, `You're username ${user_data.username} not found`);

    const is_password_matching: boolean = await compare(user_data.password, find_user.password);
    if (!is_password_matching) throw new HttpException(409, "You're password not matching");

    find_user.password = "";

    const token_data = this.createToken(find_user);
    const cookie = this.createCookie(token_data);
    return { cookie, find_user, token_data };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User data is invalid');

    const findUser: User = await this.model.user.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const data_stored_in_token: DataStoredInToken = { _id: user._id };
    const secret_key: string = SECRET_KEY;
    const expires_in: number = 60 * 1800;

    return { token: sign(data_stored_in_token, secret_key, { expiresIn: expires_in }), expires_in };
  }

  public createCookie(token_data: TokenData): string {
    return `Authorization=${token_data.token}; HttpOnly; Max-Age=${token_data.expires_in};`;
  }
}

export default AuthService;
