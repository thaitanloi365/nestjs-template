const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init1633774414948 {
    name = 'Init1633774414948'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE " users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_1a7521e5291403143744d90dfad" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE " users"`);
    }
}
