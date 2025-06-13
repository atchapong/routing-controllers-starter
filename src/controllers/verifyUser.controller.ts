
import { Controller, Get, Post, Body, Req, Res, InternalServerError, Param, Put, Delete, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import VerifyUserService from '@services/verifyUser.service'
import { VerifyUsers } from '@/interfaces/verifyUser.interface';
import { HttpException } from '@/exceptions/HttpException';
import { CreateVerifyUserDto } from '@/dtos/verifyUser.dto';

@Controller('/verifyUser')
export default class verifyUser {
  public VerifyUserService = new VerifyUserService();

  @Get("/")
    public async getAll(@Res() res: Response) {
        return res.json({
            status: true,
            data: await this.VerifyUserService.findAllVerifyUsers()
        })
    }

    @Get("/:id")
    public async getById(@Param("id") verifyUser_id: string, @Res() res: Response) {
        var verifyUser: VerifyUsers = await this.VerifyUserService.findVerifyUserById(verifyUser_id)

        if (verifyUser) {
            return res.json({
                status: true,
                data: verifyUser
            })
        } else {
            throw new HttpException(409, "verifyUser not found");
        }
    }

    @Post("/")
    public async create(@Body() createVerifyUser: CreateVerifyUserDto, @Res() res: Response) {
        const create_verifyUser = await this.VerifyUserService.createVerifyUser(createVerifyUser)
        return res.json({
            status: true,
            data: create_verifyUser
        })
    }

    @Put("/:id")
    async update(@Param("id") verifyUser_id: string, @Body() createVerifyUser: CreateVerifyUserDto, @Res() res: Response) {
        const update_verifyUser = await this.VerifyUserService.updateVerifyUser(verifyUser_id, createVerifyUser)
        return res.json({
            status: true,
            data: update_verifyUser
        })
    }

    @Delete("/:id")
    async delete(@Param("id") verifyUser_id: string, @Res() res: Response) {
        const delete_verifyUser = await this.VerifyUserService.deleteVerifyUser(verifyUser_id)
        return res.json({
            status: true,
            message: "deleted"
        })
    }
}


