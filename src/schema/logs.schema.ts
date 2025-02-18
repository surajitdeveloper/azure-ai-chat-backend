import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Logs {
   @Prop()
   email: string;
   @Prop()
   phonenumber: number;
   @Prop()
   password: string;
}
export const UserSchema = SchemaFactory.createForClass(Logs);