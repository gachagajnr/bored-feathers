export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.string('tag').alter()
  })
}

export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.specificType('tag', 'varchar[]')
  })
}
