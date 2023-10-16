import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleModule } from './roles/role.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Permission } from './permissions/permission.entity';
import { Role } from './roles/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    PermissionsModule,
    RoleModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
