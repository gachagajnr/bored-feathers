export async function up(knex) {
  await knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('name'),
    table.string('date'),
    table.string('location'),
    table.string('coordinates'),
    table.string('fee'),
    table.string('info'),
    table.string('requirements'),
    table.string('sponsors'),
    table.string('sponsors'),
  })
}

export async function down(knex) {
  await knex.schema.dropTable('events')
}
