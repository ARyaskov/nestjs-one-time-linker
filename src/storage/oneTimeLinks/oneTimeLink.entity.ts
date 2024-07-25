import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class OneTimeLinkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  value: string

  @Column({ default: false })
  used: boolean
}
