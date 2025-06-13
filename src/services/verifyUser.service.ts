
import verifyUsersModel from "@models/verifyUser.model"
import { VerifyUsers } from "@interfaces/verifyUsers.interface"
import { HttpException } from "@/exceptions/HttpException"
import { CreateVerifyUserDto } from "@/dtos/verifyUsers.dto"
class VerifyUserService {
    public verifyUser = verifyUsersModel

    public async findAllVerifyUsers(): Promise<VerifyUsers[]> {
        return await this.verifyUser.find({ is_active: true })
    }

    public async findVerifyUserById(id: string): Promise<VerifyUsers> {
        var verifyUser = await this.verifyUser.findById(id)
        if (!verifyUser) throw new HttpException(404, "VerifyUser not found")
        return verifyUser
    }

    public async createVerifyUser(verifyUserDto: CreateVerifyUserDto): Promise<VerifyUsers> {
        try {
            const createVerifyUser: VerifyUsers = await this.verifyUser.create({ ...verifyUserDto })
            return createVerifyUser
        } catch (error) {
            throw new HttpException(500, error.message)
        }
    }

    public async updateVerifyUser(id: string, verifyUserDto: CreateVerifyUserDto): Promise<VerifyUsers> {
        const findVerifyUser = await this.verifyUser.findById(id)
        if (!findVerifyUser) throw new HttpException(404, "VerifyUser not found")
        const verifyUserUpdated = await this.verifyUser.findByIdAndUpdate(id, verifyUserDto, { new: true })
        return verifyUserUpdated
    }

    public async deleteVerifyUser(id: string): Promise<Boolean> {
        const findVerifyUser = await this.verifyUser.findById(id)
        if (!findVerifyUser) throw new HttpException(404, "VerifyUser not found")
        await this.verifyUser.findByIdAndUpdate(id, { $set: { is_active: false } }, { new: true })
        return true
    }

}

export default VerifyUserService
