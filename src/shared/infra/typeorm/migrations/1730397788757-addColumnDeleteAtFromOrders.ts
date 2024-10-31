import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnDeleteAtFromOrders1730397788757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
              name: 'deletedAt',
              type: 'timestamp',
              isNullable: true,
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'deletedAt');
    }

}
