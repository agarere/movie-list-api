// role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager, In } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createRoleWithPermissions(name: string, description: string, permissionIds: number[]): Promise<Role> {
    const role = this.roleRepository.create({ name });

    if (permissionIds && permissionIds.length > 0) {
      // const permissions = await this.permissionRepository.findByIds(permissionIds);
      const permissions = await this.permissionRepository.findBy({ id: In(permissionIds) });
      role.permissions = permissions;
    }

    return await this.roleRepository.save(role);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async findRoleById(id: number): Promise<Role | undefined> {

    const role = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.id = :id', { id: id })
      .leftJoinAndSelect('role.permissions', 'permissions')
      .getOne();
    // return this.roleRepository.findOne(id, { relations: ['permissions'] });
    return role;
  }

  async updateRole(id: number, name: string, permissionIds: number[]): Promise<Role | undefined> {
    const role = await this.findRoleById(id);
    if (role) {
      role.name = name;

      if (permissionIds && permissionIds.length > 0) {
        const permissions = await this.permissionRepository.findByIds(permissionIds);
        role.permissions = permissions;
      }

      return await this.roleRepository.save(role);
    }
    return undefined;
  }

  async deleteRole(id: number): Promise<boolean> {
    const role = await this.findRoleById(id);
    if (role) {
      await this.roleRepository.remove(role);
      return true;
    }
    return false;
  }
}
