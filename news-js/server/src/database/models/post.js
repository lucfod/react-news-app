import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./category";
import { Region } from "./region";
import { User } from "./user";
import { Tag } from "./tag";
import { Link } from "./link";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "PK_posts_id",
  })
  id;

  @Column({ name: "content", type: "varchar", length: 255 })
  content;

  @ManyToOne(() => Category, (cat) => cat)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_posts_category_id",
  })
  category;

  @ManyToOne(() => Region, (region) => region)
  @JoinColumn({
    name: "region_id",
    nullable: true,
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_posts_region_id",
  })
  region;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_posts_user_id",
  })
  user;

  @OneToMany(() => Tag, (tag) => tag.post)
  tags;

  @OneToMany(() => Link, (link) => link.post)
  links;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt;
}
