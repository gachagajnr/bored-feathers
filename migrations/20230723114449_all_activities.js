export async function up(knex) {
  await knex.schema.createTable('activities', (table) => {
    table.increments('id')
    table.bigint('creatorId').references('id').inTable('users').defaultTo(null)
    table.string('company')
    table.string('name')
    table.string('location')
    table.string('description')
    table.string('coordinates')
    table.specificType('participants', 'varchar[]')
    table.specificType('prices', 'varchar[]')
    table.string('tag')
    table.string('duration')
    table.string('requirements')
    table.string('tips')
    table.string('type')
    table.boolean('isPublished').defaultTo(true)
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('activities')
}
