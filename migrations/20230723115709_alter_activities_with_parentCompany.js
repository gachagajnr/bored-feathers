export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.bigint('parentCompany').references('id').inTable('companies').defaultTo(null)
  })
}

export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('parentCompany')
  })
}
