export async function up(knex) {
  await knex.schema.alterTable('likes', (table) => {
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('likes', (table) => {
    table.dropColumn('createdAt')
  })
}
