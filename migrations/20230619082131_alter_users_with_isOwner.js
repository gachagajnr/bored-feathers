export async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.boolean('isOwner').defaultTo(false)
    table.bigint('company').references('id').inTable('companies')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('isOwwer')
    table.dropColumn('company')
  })
}
