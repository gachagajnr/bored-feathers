/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('companies', (table) => {
    // table.increments('id')
    // table.bigint('owner').references('id').inTable('users')
    table.string('companyName').notNullable().alter()
    table.string('companyPhone').notNullable().alter()
    table.string('companylocation').notNullable().alter()
    table.string('companyTown').notNullable().alter()
    table.string('companyStreet').notNullable().alter()
    table.string('companyBio').notNullable().alter()
    // table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('companies', (table) => {
    // table.dropColumn('id')
    // table.dropColumn('owner').references('id').inTable('users')
     table.string('companyName').nullable().alter()
     table.string('companyPhone').nullable().alter()
     table.string('companylocation').nullable().alter()
     table.string('companyTown').nullable().alter()
     table.string('companyStreet').nullable().alter()
     table.string('companyBio').nullable().alter()
    // table.dropColumn('createdAt')
  })
//   await knex.schema.dropTable('companies')
}
