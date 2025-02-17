import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  CreateUsertDto } from '../dto/create-user.dto';
import { UpdateUsertDto} from "../dto/update-user.dto"
import {IUser} from "../interface/userinterface"

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel:Model<IUser>) { }
    async createUser(createUsertDto: CreateUsertDto): Promise<IUser> {
       const newUser = await new this.userModel(createUsertDto);
       return newUser.save();
    }
    async updateUser(userId: string, updateUsertDto: UpdateUsertDto): Promise<IUser> {
        const existingUser = await        this.userModel.findByIdAndUpdate(userId, updateUsertDto, { new: true });
       if (!existingUser) {
         throw new NotFoundException(`User #${userId} not found`);
       }
       return existingUser;
    }
    async getAllUser(): Promise<IUser[]> {
        const userData = await this.userModel.find();
        if (!userData || userData.length == 0) {
            throw new NotFoundException('User data not found!');
        }
        return userData;
    }
    async getUser(userId: string): Promise<IUser> {
       const existingUser = await     this.userModel.findById(userId).exec();
       if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
       }
       return existingUser;
    }
    async deleteUser(userId: string): Promise<IUser> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
       if (!deletedUser) {
         throw new NotFoundException(`User #${userId} not found`);
       }
       return deletedUser;
    }
}
