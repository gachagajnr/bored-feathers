/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('activities', (table) => {
    table.increments('id')
    table.string('company')
    table.string('name')
    table.string('location')
    table.string('description')
    table.string('coordinates')
    table.specificType('participants', 'json[]')
    table.specificType('prices', 'json[]')
    table.string('duration')
    table.string('requirements')
    table.string('tips')
  })

  await knex.schema.alterTable('activities', (table) => {
    table.bigint('createdAt')
    table.bigint('companyId').references('id').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('createdAt')
    table.dropColumn('companyId')
  })
  await knex.schema.dropTable('activities')
}
