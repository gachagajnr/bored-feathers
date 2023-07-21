export async function up(knex) {
  await knex.schema.createTable('packages', (table) => {
    table.increments('id')
    table.bigint('owner').references('id').inTable('users')
    table.string('name')
    table.string('price')
    table.specificType('addons','varchar[]')

  })
}

export async function down(knex) {
  await knex.schema.dropTable('packages')
}
