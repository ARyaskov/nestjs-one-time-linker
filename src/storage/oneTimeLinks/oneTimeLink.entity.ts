import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("one_time_links")
export class OneTimeLinkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  value: string

  @Column({ default: false })
  used: boolean
}
