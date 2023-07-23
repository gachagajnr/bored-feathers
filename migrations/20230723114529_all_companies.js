/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('companies', (table) => {
    table.increments('id')
    table.bigint('owner').references('id').inTable('users')
    table.string('companyName').notNullable()
    table.string('companyPhone').unique().notNullable()
    table.string('companyLocation').notNullable()
    table.string('companyTown').notNullable()
    table.string('companyStreet').notNullable()
    table.string('companyBio').notNullable()
    table.bigint('createdAt')
  })
}

export async function down(knex) {
    await knex.schema.dropTable('companies')

}
