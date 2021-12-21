import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Role } from './Role'
import { JoinTable } from 'typeorm/browser'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  login: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  firstName: string;

  @Column({ type: 'text', nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  surName: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @ManyToMany(() => Role, {
    cascade: true
  })
  @JoinTable()
  roles: Role[];
}