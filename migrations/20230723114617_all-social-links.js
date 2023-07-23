export async function up(knex) {
  await knex.schema.createTable('social-links', (table) => {
    table.increments('id')
    table.string('facebook')
    table.string('instagram')
    table.string('linkedin')
    table.string('twitter')
    table.bigint('parentCompany').references('id').inTable('companies')
    table.bigint('creatorId').references('id').inTable('users')
    table.bigint('createdAt')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('social-links')
}
