const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ChangeUserEmailType1633781745333 {
    name = 'ChangeUserEmailType1633781745333'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE " users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE " users" ADD "email" citext NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE " users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE " users" ADD "email" character varying NOT NULL`);
    }
}
