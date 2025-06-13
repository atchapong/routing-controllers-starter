
import { Controller, Get, Post, Body, Req, Res, InternalServerError, Param, Put, Delete, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import GameService from '@services/game.service'
import { Games } from '@/interfaces/game.interface';
import { HttpException } from '@/exceptions/HttpException';
import { CreateGameDto } from '@/dtos/game.dto';

@Controller('/game')
export default class game {
  public GameService = new GameService();

  @Get("/")
    public async getAll(@Res() res: Response) {
        return res.json({
            status: true,
            data: await this.GameService.findAllGames()
        })
    }

    @Get("/:id")
    public async getById(@Param("id") game_id: string, @Res() res: Response) {
        var game: Games = await this.GameService.findGameById(game_id)

        if (game) {
            return res.json({
                status: true,
                data: game
            })
        } else {
            throw new HttpException(409, "game not found");
        }
    }

    @Post("/")
    public async create(@Body() createGame: CreateGameDto, @Res() res: Response) {
        const create_game = await this.GameService.createGame(createGame)
        return res.json({
            status: true,
            data: create_game
        })
    }

    @Put("/:id")
    async update(@Param("id") game_id: string, @Body() createGame: CreateGameDto, @Res() res: Response) {
        const update_game = await this.GameService.updateGame(game_id, createGame)
        return res.json({
            status: true,
            data: update_game
        })
    }

    @Delete("/:id")
    async delete(@Param("id") game_id: string, @Res() res: Response) {
        const delete_game = await this.GameService.deleteGame(game_id)
        return res.json({
            status: true,
            message: "deleted"
        })
    }
}


