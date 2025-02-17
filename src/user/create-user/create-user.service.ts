import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  CreateUsertDto } from '../../dto/create-user.dto';
import { UpdateUsertDto} from "../../dto/update-user.dto"
import {IUser} from "../../interface/userinterface"

@Injectable()
export class CreateUserService {


    constructor(@InjectModel('User') private userModel:Model<IUser>) { }
    async createStudent(createUsertDto: CreateUsertDto): Promise<IUser> {
       const newStudent = await new this.userModel(createUsertDto);
       return newStudent.save();
    }
    async updateStudent(studentId: string, updateUsertDto: UpdateUsertDto): Promise<IUser> {
        const existingStudent = await        this.userModel.findByIdAndUpdate(studentId, updateUsertDto, { new: true });
       if (!existingStudent) {
         throw new NotFoundException(`Student #${studentId} not found`);
       }
       return existingStudent;
    }
    async getAllStudents(): Promise<IUser[]> {
        const studentData = await this.userModel.find();
        if (!studentData || studentData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return studentData;
    }
    async getStudent(studentId: string): Promise<IUser> {
       const existingStudent = await     this.userModel.findById(studentId).exec();
       if (!existingStudent) {
        throw new NotFoundException(`Student #${studentId} not found`);
       }
       return existingStudent;
    }
    async deleteStudent(studentId: string): Promise<IUser> {
        const deletedStudent = await this.userModel.findByIdAndDelete(studentId);
       if (!deletedStudent) {
         throw new NotFoundException(`Student #${studentId} not found`);
       }
       return deletedStudent;
    }


}
