// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CryptoService } from 'src/crypto/crypto.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cryptoService: CryptoService
  ) {}

  @Post()
  createUser(@Body() userData: { username: string, email: string, firstname: string, lastname: string, password: string }): Promise<User> {
    const { username, email, password, firstname, lastname } = userData;

    const hashPassword = this.cryptoService.hashPassword(password)

    return this.userService.createUser(username, email, firstname, lastname, hashPassword);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userData: { username: string, email: string, password: string }): Promise<User | undefined> {
    const { username, email, password } = userData;
    return this.userService.updateUser(id, username, email, password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  @Post(':userId/assign-roles')
  assignRolesToUser(@Param('userId') userId: number, @Body() roleIds: number[]): Promise<User | undefined> {
    return this.userService.assignRolesToUser(userId, roleIds);
  }
}
