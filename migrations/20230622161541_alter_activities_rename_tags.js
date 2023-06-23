export async function up(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.renameColumn('tags', 'tag')
    table.string('tags').alter().defaultTo('')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('activities', (table) => {
    table.renameColumn('tag', 'tags')
    table.specificType('tags', 'varchar[]').alter()
  })
}
