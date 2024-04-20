import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleModel } from '../../auth/models/roles.model';
import { User } from './user.entity';
@Entity({ name: 'roles' })
export class roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name_role: RoleModel;

  @OneToMany(() => User, (users) => users.role)
  users: User[];
}
