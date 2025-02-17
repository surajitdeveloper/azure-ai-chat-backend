import { Document } from 'mongoose';
export interface IUser extends Document{
    readonly email: string;
    readonly phonenumber: number;
    readonly password: string;
}