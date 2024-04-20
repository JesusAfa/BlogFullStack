import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { roles } from './role.entity';
import { Exclude } from 'class-transformer';
import { Post } from 'src/post/entities/post.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToOne(() => roles, (roles) => roles.users, { nullable: false })
  role: roles;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
