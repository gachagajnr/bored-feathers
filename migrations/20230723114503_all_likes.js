export async function up(knex) {
  await knex.schema.createTable('likes', (table) => {
    table.increments('id')
    table.bigint('userId').references('id').inTable('users').defaultTo(null)
    table.bigint('activityId').references('id').inTable('activities').defaultTo(null)
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('likes')
}
