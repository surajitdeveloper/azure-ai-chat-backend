import { Document } from 'mongoose';

export interface ILogs extends Document {
    user: string;
    ai: string;
    query: string;
    response: string;
    querytimestamp: string;
    responsestamp: string;
    ip: string;
    location: string;
    deviceid: string;
    browser: string;
    executedtime: string;
    status: string;
    note: string;
    error: string;
    logtimestamp: string;
}