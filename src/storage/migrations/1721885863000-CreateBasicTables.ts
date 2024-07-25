import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateBasicTables1721885863000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "one_time_links" (
                "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                "value" VARCHAR(4096) NOT NULL,
                "used" BOOLEAN NOT NULL DEFAULT FALSE
            )
        `)

    await queryRunner.query(`
            CREATE INDEX "idx_id_one_time_links" ON "one_time_links" ("id")
        `)

    await queryRunner.query(`
            CREATE INDEX "idx_value_one_time_links" ON "one_time_links" ("value")
        `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_id_one_time_links"`)
    await queryRunner.query(`DROP INDEX "idx_value_one_time_links"`)
    await queryRunner.query(`DROP TABLE "one_time_links"`)
  }
}
