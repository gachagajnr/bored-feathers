export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.bigint('createdAt')
    table.bigint('ownerId').references('id').inTable('users')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('avatar')
  })

  await knex.schema.alterTable('activities', (table) => {
    table.dropColumn('createdAt')
    table.dropColumn('ownerId')
  })
}
