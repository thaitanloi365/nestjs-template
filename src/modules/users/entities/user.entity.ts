import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { UserRole } from '../enums/role.enum';
import { AbstractEntity } from '../../../common/entities/abtract.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'citext', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  resetPasswordToken: string;

  @Column({ type: 'bool', default: false })
  mailVerfied: boolean;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  jwtId: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
