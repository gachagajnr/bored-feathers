/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('companies', (table) => {
    table.increments('id')
    table.bigint('owner').references('id').inTable('users')
    table.string('companyName')
    table.string('companyPhone')
    table.string('companylocation')
    table.string('companyTown')
    table.string('companyStreet')
    table.string('companyBio')
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('companies', (table) => {
    table.dropTable('companies')
  })
}
