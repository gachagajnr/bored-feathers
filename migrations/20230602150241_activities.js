export async function up(knex) {
  await knex.schema.createTable('activities', (table) => {
    table.increments('id')
     table.string('activityName')
     table.string('activityLocation')
     table.string('coordinates')
     table.string('description')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('activities')
}
