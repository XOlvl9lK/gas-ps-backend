import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'

enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RolesEnum, nullable: false, unique: true })
  title: RolesEnum;
}