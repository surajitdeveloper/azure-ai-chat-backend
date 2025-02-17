import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUsertDto } from 'src/dto/create-user.dto';
import { UpdateUsertDto } from 'src/dto/update-user.dto';
import {CreateUserService} from "./create-user.service"

@Controller('create-user')
export class CreateUserController {
    
    
    constructor(private readonly createUserService: CreateUserService) { }
@Post()
   async createUser(@Res() response, @Body() createUsertDto: CreateUsertDto) {
  try {
    const newUser = await this.createUserService.createUser(createUsertDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'User has been created successfully',
    newUser,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: User not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateUser(@Res() response,@Param('id') userId: string,
@Body() updateUsertDto: UpdateUsertDto) {
  try {
   const existingUser = await this.createUserService.updateUser(userId, updateUsertDto);
  return response.status(HttpStatus.OK).json({
  message: 'User has been successfully updated',
  existingUser,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getUser(@Res() response) {
try {
  const userData = await this.createUserService.getAllUser();
  return response.status(HttpStatus.OK).json({
  message: 'All user data found successfully',userData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getUserById(@Res() response, @Param('id') userId: string) {
 try {
    const existingUser = await this.createUserService.getUser(userId);
    return response.status(HttpStatus.OK).json({
    message: 'User found successfully',existingUser,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteUser(@Res() response, @Param('id') userId: string)
{
  try {
    const deletedUser = await this.createUserService.deleteUser(userId);
    return response.status(HttpStatus.OK).json({
    message: 'User deleted successfully',
    deletedUser,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }



}
