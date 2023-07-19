/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('events', (table) => {
    table.boolean('isPublished').defaultTo(false)
   })
}

export async function down(knex) {
  await knex.schema.alterTable('events', (table) => {
    table.dropColumn('isPublished')
   })
}
