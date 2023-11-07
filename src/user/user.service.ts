// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createUser(username: string, email: string, firstname: string, lastname: string, password: string): Promise<User> {
    const user = this.userRepository.create({ username, firstname, lastname, email, password });
    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateUser(id: number, username: string, email: string, password: string): Promise<User | undefined> {
    const user = await this.findUserById(id);
    if (user) {
      user.username = username;
      user.email = email;
      user.password = password;
      return await this.userRepository.save(user);
    }
    return undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.findUserById(id);
    if (user) {
      await this.userRepository.remove(user);
      return true;
    }
    return false;
  }

  async assignRolesToUser(userId: number, roleIds: number[]): Promise<User | undefined> {

    const user: User | undefined = await this.userRepository.findOne({ where: { id: userId } });

    if (user) {
      if (!user.roles) {
        user.roles = [];
      }

      const roles = await this.roleRepository.findBy({ id: In(roleIds) });

      // Eğer kullanıcı bu rolleri zaten eklememişse, rolleri kullanıcının rollerine ekleyin.
      roles.forEach((role) => {
        if (!user.roles.find((r) => r.id === role.id)) {
          user.roles.push(role);
        }
      });

      await this.userRepository.save(user);
      return user;
    }

    return undefined;
  }
}
