import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableUnique,
} from 'typeorm';

export class CreateCar1730142904480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'plate', type: 'varchar', isUnique: true, isNullable: false },
          { name: 'brand', type: 'varchar', isNullable: false },
          { name: 'model', type: 'varchar', isNullable: false },
          { name: 'year', type: 'int', isNullable: false },
          { name: 'km', type: 'float', isNullable: true },
          { name: 'price', type: 'float', isNullable: false },
          { name: 'items', type: 'jsonb', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          {
            name: 'status',
            type: 'enum',
            enum: ['ativo', 'inativo', 'excluído'],
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
