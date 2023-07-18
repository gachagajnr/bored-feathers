export async function up(knex) {
  await knex.schema.createTable('liked-events', (table) => {
    table.increments('id')
    table.bigint('userId').references('id').inTable('users')
    table.bigint('eventId').references('id').inTable('events')
    table.bigint('createdAt')
  
  })
}

export async function down(knex) {
  await knex.schema.dropTable('liked-events')
}
