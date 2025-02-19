import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Logs {
   @Prop()
   user: string;
   @Prop()
   ai: string;
   @Prop()
   query: string;
   @Prop()
   response: string;
   @Prop()
   querytimestamp: string;
   @Prop()
   responsestamp: string;
   @Prop()
   ip: string;
   @Prop()
   location: string;
   @Prop()
   deviceid: string;
   @Prop()
   browser: string;
   @Prop()
   executedtime: string;
   @Prop()
   status: string;
   @Prop()
   note: string;
   @Prop()
   error: string;
   @Prop()
   logtimestamp: string;
   @Prop()
   clientId: string;
}
export const LogsSchema = SchemaFactory.createForClass(Logs);