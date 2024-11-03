import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserIdColumn1730650649699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            ALTER COLUMN "id" 
            SET DEFAULT uuid_generate_v4()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            ALTER COLUMN "id" 
            DROP DEFAULT
        `);
    }

}
