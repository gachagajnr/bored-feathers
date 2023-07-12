/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('events', (table) => {
    table.string('tag')
    table.string('type')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('events', (table) => {
    table.dropColumn('tag')
    table.dropColumn('type')
  })
}
