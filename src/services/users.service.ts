import { hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty, IdValidId } from '@utils/util';
import { logger, stream } from '@utils/logger';
import { PaginationDto } from '@/dtos/utilities.dto';
import { checkPageLimit } from '@utils/pagination';
import mongoose from 'mongoose';
import axios from 'axios';
import crypto from "crypto";

//dto
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';

//interface
import { User } from '@/interfaces/user.interface';

//service
import MainService from '@/services/main.service';

class UserService extends MainService {
  
  constructor() {
    super();
  }

  /**
   * It returns a list of Users, with a default limit of 20 and a default skip of 1
   * @param {PaginationDto}  - PaginationDto: This is the DTO that we created earlier.
   * @returns An array of Users
   */
  public async findAllUser({ limit = 20, skip = 1 }: PaginationDto): Promise<User[]> {
    let Users: User[] = await this.model.user
      .find({}, this.selecetData())

    Users = await checkPageLimit(Users, limit, skip);
    return Users;
  }

  public async findUserByEmail(email: string, is_show_password = false): Promise<User> {
    if (isEmpty(email)) throw new HttpException(400, "You're not email");

    let selectData: any = this.selecetData();

    if (is_show_password) {
      selectData = { ...this.selecetData(), password: 1 };
    }

    const find_User: User = await this.model.user
      .findOne({ email: email }, selectData)

    return find_User;
  }

  public async findUserByUsername(username: string, is_show_password = false): Promise<User> {
    if (isEmpty(username)) throw new HttpException(400, "You're not email");

    let selectData: any = this.selecetData();

    if (is_show_password) {
      selectData = { ...this.selecetData(), password: 1 };
    }

    const find_User: User = await this.model.user
      .findOne({ username: username }, selectData)
    return find_User;
  }

  /**
   * It finds a User by their id and returns the User
   * @param {string} User_id - The User's id.
   * @returns public async findUserById(User_id: string): Promise<User> {
   *     if (isEmpty(User_id)) throw new HttpException(400, "You're not UserId");
   */
  public async findUserById(User_id: string): Promise<User> {
    if (isEmpty(User_id)) throw new HttpException(400, "You're not UserId");

    const find_User: User = await this.model.user
      .findOne({ _id: User_id }, this.selecetData())

    if (!find_User) throw new HttpException(409, "You're not User");

    return find_User;
  }

  /**
   * It creates a new User in the database
   * @param {CreateUserDto} User_data - CreateUserDto
   * @returns The User data that was created.
   */
  public async createUser(User_data: CreateUserDto): Promise<User> {
    if (isEmpty(User_data)) throw new HttpException(400, "You're not UserData");

    const find_User: User = await this.model.user.findOne({ email: User_data.email });
    if (find_User) throw new HttpException(409, `You're email ${User_data.email} already exists`);
    
    const find_username: User = await this.model.user.findOne({ username: User_data.username });
    if (find_username) throw new HttpException(409, `You're username ${User_data.username} already exists`);



    const hashed_password: string = await hash(User_data.password, 10);


    const create_User_data: User = await this.model.user.create({
      ...User_data,
      password: hashed_password,
      role: 'User'
    });

    const UserData: User = await this.findUserById(create_User_data._id);
    return UserData;
  }

  /**
   * It updates a User by id, and returns the updated User
   * @param {string} User_id - The id of the User you want to update.
   * @param {UpdateUserDto} User_data - UpdateUserDto
   * @returns The User is being returned.
   */
  public async updateUser(User_id: string, User_data: UpdateUserDto): Promise<User> {
    try {
      if (isEmpty(User_data)) throw new HttpException(400, "You're not UserData");

      const find_User: User = await this.model.user.findOne({ _id: User_id });

      if (find_User == null) {
        throw new HttpException(400, `User Not found`);
      }

      if (User_data.email) {
        if (find_User && find_User._id != User_id) throw new HttpException(409, `You're email ${User_data.email} already exists`);
      }

      if (User_data.password) {
        const hashed_password = await hash(User_data.password, 10);
        User_data = { ...User_data, password: hashed_password };
      }

      const User: User = await this.findUserById(User_id);

      if (!User) throw new HttpException(400, "You're not User");

      return User;
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }

  /**
   * It deletes a User by id
   * @param {string} User_id - The id of the User you want to delete.
   * @returns The User that was deleted.
   */
  public async deleteUser(User_id: string): Promise<User> {
    const delete_User_by_id: User = await this.model.user.findByIdAndDelete(User_id);
    if (!delete_User_by_id) throw new HttpException(409, "You're not User");

    return delete_User_by_id;
  }

  /**
   * It returns an object that contains the fields that we want to select from the database
   * @returns The data that is being returned is the data that is being selected from the database.
   */
  public selecetData() {
    return {
      is_active: 1,
      _id: 1,
      email: 1,
      username: 1,
      created_at: 1,
      updated_at: 1,
      tel : 1,
      bank_name: 1,
      bank_account_name: 1,
      bank_account_number: 1,
      total_credit: 1,
      register_domain: 1,
      verified_status: 1,
      accept_condition: 1,
    };
  }

}

export default UserService;
