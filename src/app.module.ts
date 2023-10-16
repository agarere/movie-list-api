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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3000,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
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
