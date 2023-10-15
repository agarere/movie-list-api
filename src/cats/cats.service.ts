import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(catData: Cat): Promise<Cat> {
    const newCat = this.catRepository.create(catData);
    return await this.catRepository.save(newCat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }
}
