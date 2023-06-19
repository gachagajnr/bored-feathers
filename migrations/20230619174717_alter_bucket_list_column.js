export async function up(knex) {
  await knex.schema.alterTable('bucket-list', (table) => {
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('bucket-list', (table) => {
    table.dropColumn('createdAt')
  })
}
