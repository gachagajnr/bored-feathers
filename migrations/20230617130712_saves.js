export async function up(knex) {
  await knex.schema.createTable('saves', (table) => {
    table.increments('id')
    table.bigint('userId').references('id').inTable('users')
    table.bigint('activityId').references('id').inTable('activities')
    table.bigint('createdAt')

  })
}

export async function down(knex) {
  await knex.schema.dropTable('saves')
}
