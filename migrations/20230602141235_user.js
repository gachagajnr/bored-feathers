export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').unique()
    table.string('firstName')
    table.string('lastName')
    table.string('avatar')
    table.string('phoneNumber')
    table.string('password')
    table.string('googleId')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
