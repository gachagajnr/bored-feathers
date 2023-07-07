export async function up(knex) {
  await knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('name'),
      table.string('date'),
      table.string('venue'),
      table.string('coordinates'),
      table.string('fee'),
      table.string('info'),
      table.string('sponsors'),
      table.bigint('parentCompany').references('id').inTable('companies'),
      table.bigint('creatorId').references('id').inTable('users')
      table.bigint('createdAt')

  })
}

export async function down(knex) {
  await knex.schema.dropTable('events')
}
