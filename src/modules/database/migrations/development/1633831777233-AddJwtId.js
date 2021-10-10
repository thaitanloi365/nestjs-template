const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddJwtId1633831777233 {
    name = 'AddJwtId1633831777233'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "jwt_id" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "jwt_id"`);
    }
}
