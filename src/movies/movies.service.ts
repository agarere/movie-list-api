import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.moviesRepository.create(movieData);
    return this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

}
