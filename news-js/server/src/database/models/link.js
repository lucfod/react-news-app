import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./post";

@Entity({ name: "links" })
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "PK_links_id",
  })
  id;

  @Column({ name: "name", type: "varchar", length: 100, unique: true })
  name;

  @Column({ name: "url", type: "varchar", length: 100, unique: true })
  url;

  @ManyToOne(() => Post, (post) => post.links)
  @JoinColumn({
    name: "post_id",
    nullable: false,
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_links_post_id",
  })
  post;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt;
}
