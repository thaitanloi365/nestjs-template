import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../modules/users/enums/role.enum';

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
