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

@Entity({ name: "tags" })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "PK_tags_id",
  })
  id;

  @Column({ name: "tag", type: "varchar", length: 100, unique: true })
  tag;

  @ManyToOne(() => Post, (post) => post.tags)
  @JoinColumn({
    name: "post_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_tags_post_id",
  })
  post;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt;
}
