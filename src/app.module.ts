import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/cat.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

// type: "postgres",
// host: "localhost",
// port: 5432,
// username: "postgres",
// password: "12345",
// database: "movielistapi",
// entities: ["dist/**/*.entity{.ts,.js}"],
// synchronize: true
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config.env',
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ["**/*.entity{.ts,.js}"],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      logging: "all"
    }),
    TypeOrmModule.forFeature([Cat]),
    
    UserModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule { }
