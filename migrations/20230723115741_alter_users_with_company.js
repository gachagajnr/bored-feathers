export async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.bigint('company').references('id').inTable('companies').defaultTo(null)
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('company')
  })
}
