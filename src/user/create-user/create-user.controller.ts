import { Controller, Get } from '@nestjs/common';

@Controller('create-user')
export class CreateUserController {
    @Get()
    getHello(): string {
      return 'create user';
    }
    @Get('create-user')
    get(): string {
      return 'create user create';
    }
}
