import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, RelationId,
} from 'typeorm';
import { BaseEntity } from './BaseEntity'
import { Chapter } from './Chapter';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => Chapter)
  @JoinColumn({ name: 'chapterId' })
  chapter: Chapter

  @Column({ type: 'int', nullable: true })
  chapterId: number
}