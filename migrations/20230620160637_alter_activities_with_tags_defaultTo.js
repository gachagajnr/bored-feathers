/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.specificType('tags', 'varchar[]').defaultTo({})
  })
}

export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('tags', 'varchar[]')
  })
  await knex.schema.dropTable('activities')
}
