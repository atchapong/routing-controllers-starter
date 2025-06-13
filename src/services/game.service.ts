
import gamesModel from "@models/game.model"
import { Games } from "@interfaces/games.interface"
import { HttpException } from "@/exceptions/HttpException"
import { CreateGameDto } from "@/dtos/games.dto"
class GameService {
    public game = gamesModel

    public async findAllGames(): Promise<Games[]> {
        return await this.game.find({ is_active: true })
    }

    public async findGameById(id: string): Promise<Games> {
        var game = await this.game.findById(id)
        if (!game) throw new HttpException(404, "Game not found")
        return game
    }

    public async createGame(gameDto: CreateGameDto): Promise<Games> {
        try {
            const createGame: Games = await this.game.create({ ...gameDto })
            return createGame
        } catch (error) {
            throw new HttpException(500, error.message)
        }
    }

    public async updateGame(id: string, gameDto: CreateGameDto): Promise<Games> {
        const findGame = await this.game.findById(id)
        if (!findGame) throw new HttpException(404, "Game not found")
        const gameUpdated = await this.game.findByIdAndUpdate(id, gameDto, { new: true })
        return gameUpdated
    }

    public async deleteGame(id: string): Promise<Boolean> {
        const findGame = await this.game.findById(id)
        if (!findGame) throw new HttpException(404, "Game not found")
        await this.game.findByIdAndUpdate(id, { $set: { is_active: false } }, { new: true })
        return true
    }

}

export default GameService
