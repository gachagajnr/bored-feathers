/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.string('type')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('type')
  })
  await knex.schema.dropTable('activities')
}
