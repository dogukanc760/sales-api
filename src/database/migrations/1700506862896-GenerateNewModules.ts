import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateNewModules1700506862896 implements MigrationInterface {
    name = 'GenerateNewModules1700506862896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_33b88e166df04f2d9291628bebb"`);
        await queryRunner.query(`CREATE TABLE "dynamic_reports" ("id" SERIAL NOT NULL, "reportModule" character varying NOT NULL, "reportName" character varying NOT NULL, "reportDescription" character varying, "reportQuery" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a4664eb88b2756cfa91274d75bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e75bdb75100f83382ebdbcb7be" ON "dynamic_reports" ("reportModule") `);
        await queryRunner.query(`CREATE INDEX "IDX_e36a24b5245dffdcb551c6703e" ON "dynamic_reports" ("reportName") `);
        await queryRunner.query(`CREATE TABLE "dictionaries" ("id" SERIAL NOT NULL, "unitCode" character varying(3) NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_5d8cc1c53f99db0dcafde98031a" UNIQUE ("key"), CONSTRAINT "UQ_765d1da08c18aa6636d89934d0a" UNIQUE ("value"), CONSTRAINT "PK_b864abffe7546b378d6ce4ba7c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f8ba6647166689e35592c0a16" ON "dictionaries" ("unitCode") `);
        await queryRunner.query(`CREATE TABLE "sales_detail" ("id" SERIAL NOT NULL, "salesId" character varying NOT NULL, "productId" character varying NOT NULL, "count" integer NOT NULL, "unitPrice" integer NOT NULL, "taxRate" integer NOT NULL, "totalUnitPrice" integer NOT NULL, "unitType" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b683a33c50fe3ce4d87669f6e4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0eda0635e66b8f815b2c8e14e3" ON "sales_detail" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e770e13b95b9a9a17a02bd3e57" ON "sales_detail" ("productId") `);
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "currentAccountId" character varying, "count" integer NOT NULL, "totalPrice" integer NOT NULL, "paymentMethod" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9af8c3b709bf7f2fa5c50499f5" ON "sales" ("currentAccountId") `);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryIdId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryIdId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9af8c3b709bf7f2fa5c50499f5"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e770e13b95b9a9a17a02bd3e57"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0eda0635e66b8f815b2c8e14e3"`);
        await queryRunner.query(`DROP TABLE "sales_detail"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f8ba6647166689e35592c0a16"`);
        await queryRunner.query(`DROP TABLE "dictionaries"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e36a24b5245dffdcb551c6703e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e75bdb75100f83382ebdbcb7be"`);
        await queryRunner.query(`DROP TABLE "dynamic_reports"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_33b88e166df04f2d9291628bebb" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
