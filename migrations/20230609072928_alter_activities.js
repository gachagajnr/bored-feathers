/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.bigint('createdAt')
    table.bigint('companyId').references('id').inTable('users')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('createdAt')
    table.dropColumn('companyId')
  })
}
