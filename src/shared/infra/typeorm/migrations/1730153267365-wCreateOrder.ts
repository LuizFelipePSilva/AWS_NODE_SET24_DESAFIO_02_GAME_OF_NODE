import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class  wCreateOrder1730153267365 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "clientId", type: "uuid", isNullable: false },
                    { name: "orderDate", type: "timestamp", default: "now()" },
                    { name: "status", type: "enum", enum: ["Aberto", "Aprovado", "Cancelado"], isNullable: false },
                    { name: "cep", type: "varchar", isNullable: false },
                    { name: "city", type: "varchar", isNullable: false },
                    { name: "uf", type: "varchar", isNullable: false },
                    { name: "totalValue", type: "float", isNullable: false },
                    { name: "carId", type: "uuid", isNullable: false },
                    { name: "purchaseDate", type: "timestamp", default: "now()" },
                    { name: "cancellationDate", type: "timestamp", isNullable: true }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "orders",
            new TableForeignKey({
                columnNames: ["clientId"],
                referencedColumnNames: ["id"],
                referencedTableName: "clients",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "orders",
            new TableForeignKey({
                columnNames: ["carId"],
                referencedColumnNames: ["id"],
                referencedTableName: "cars",
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }
}
