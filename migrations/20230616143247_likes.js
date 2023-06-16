export async function up(knex) {
  await knex.schema.createTable('likes', (table) => {
    table.increments('id')
    table.bigint('userId').references('id').inTable('users')
    table.bigint('activityId').references('id').inTable('activities')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('activities')
}
