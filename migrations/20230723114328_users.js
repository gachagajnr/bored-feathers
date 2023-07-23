export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').unique()
    table.string('firstName')
    table.string('lastName')
    table.string('avatar')
    table.string('phoneNumber').unique()
    table.string('password')
    table.string('googleId')
    table.boolean('isOwner').defaultTo(false)
    table.boolean('isVerified').defaultTo(false)
    table.bigint('verifyExpires')
    table.specificType('verifyChanges', 'varchar[]')
    table.bigint('resetAttempts')
    table.bigint('resetExpires')
    table.string('resetShortToken')
    table.string('resetToken')
    table.string('verifyShortToken')
    table.string('verifyToken')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
