import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@/models/user.model';
import { User } from '@/interfaces/user.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null) || req.cookies['Authorization']
    // Fr7vcLUmiVoayHrkNMU158z1v0AIUJ8bLm0Qx1mtGbIcQVaZ6j
    if (Authorization) {
      const secret_key: string = SECRET_KEY;
      const verification_response = (await verify(Authorization, secret_key)) as DataStoredInToken;
      const user_id = verification_response._id;
      const find_user : User = await userModel.findById(user_id);

      if (find_user) {

        if(req.params.user_id != undefined && req.params.user_id != find_user._id.toString()) {
          next(new HttpException(401, 'login data not match please check your data'));
        } 

        req.user = find_user;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
