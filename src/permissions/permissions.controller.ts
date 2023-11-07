import { Controller, Get, Post, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() permissionData: Partial<Permission>): Promise<Permission> {
    return this.permissionsService.create(permissionData);
  }

  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }
}