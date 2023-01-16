import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "regions" })
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "PK_regions_id",
  })
  id;

  @Column({ name: "name", type: "varchar", length: 100, unique: true })
  name;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt;
}
