import { CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'

@Entity()
export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date
}