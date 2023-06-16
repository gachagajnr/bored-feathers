export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.boolean('isPublished')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('isPublished')
  })
  await knex.schema.dropTable('activities')
}
