// role.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  createRoleWithPermissions(@Body() roleData: { name: string, description: string, permissionIds: number[] }): Promise<Role> {
    const { name, description, permissionIds } = roleData;
    return this.roleService.createRoleWithPermissions(name, description, permissionIds);
  }

  @Get()
  findAllRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  findRoleById(@Param('id') id: number): Promise<Role | undefined> {
    return this.roleService.findRoleById(id);
  }

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() roleData: { name: string, description: string, permissionIds: number[] }): Promise<Role | undefined> {
    const { name, description, permissionIds } = roleData;
    return this.roleService.updateRole(id, name, permissionIds);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number): Promise<boolean> {
    return this.roleService.deleteRole(id);
  }
}
