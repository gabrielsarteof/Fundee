import { Controller, Get } from '@nestjs/common';
import { AppService }      from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')  
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna a mensagem de saudação padrão' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de saudação retornada com sucesso.',
    schema: { example: 'Hello World!' },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
