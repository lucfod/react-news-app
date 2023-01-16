import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./post";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "PK_users_id",
  })
  id;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName;

  @Column({ name: "email", type: "varchar", length: 150, unique: true })
  email;

  @Column({ name: "password", type: "varchar", length: 100 })
  password;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt;
}
