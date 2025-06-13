import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import User from '@/models/user.model';

export default class roleMiddleware implements ExpressMiddlewareInterface {
  public role;

  constructor() {
    this.role = 'admin';
  }

  async use(req: any, res: Response, next: NextFunction) {
    try {
      const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

      if (Authorization) {
        const secret_key: string = SECRET_KEY;
        const verification_response = (await verify(Authorization, secret_key)) as DataStoredInToken;
        const pser_id = verification_response._id;

        let find_pser = null;

        if (req.pser != undefined || req.pser != null) {
          find_pser = req.pser;
        } else {
          find_pser = await User.findById(pser_id);
        }

        if (find_pser.role != this.role) {
          next(new HttpException(401, 'Your role wrong'));
        }

        if (find_pser) {
          req.pser = find_pser;
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
  }
}
