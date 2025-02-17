import { PartialType } from '@nestjs/mapped-types';
import { CreateUsertDto } from './create-user.dto';
export class UpdateUsertDto extends PartialType(CreateUsertDto) {}