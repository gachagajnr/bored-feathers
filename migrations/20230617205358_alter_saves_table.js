export async function up(knex) {
  await knex.schema.alterTable('saves', (table) => {
    table.foreign('userId').references('id').inTable('users')
    table.foreign('activityId').references('id').inTable('activities')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('saves')
}
