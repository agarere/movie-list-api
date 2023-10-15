import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() catData: Cat): Promise<Cat> {
    return this.catsService.create(catData);
  }
  
  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
