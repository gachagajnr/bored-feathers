export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.renameColumn('companyId', 'creatorId')
    table.bigint('parentCompany').references('id').inTable('companies')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.renameColumn('creatorId', 'companyId')
  })
}
