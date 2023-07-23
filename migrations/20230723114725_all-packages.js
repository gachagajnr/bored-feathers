export async function up(knex) {
  await knex.schema.createTable('packages', (table) => {
    table.increments('id')
    table.bigint('owner').references('id').inTable('users')
    table.string('name').unique()
    table.string('price')
    table.specificType('addons', 'varchar[]')
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('packages')
}
