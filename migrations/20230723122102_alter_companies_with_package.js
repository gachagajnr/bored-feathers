export async function up(knex) {
  await knex.schema.alterTable('companies', (table) => {
    table.bigint('package').references('id').on('packages')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('companies', (table) => {
    table.dropColumn('package')
  })
}

