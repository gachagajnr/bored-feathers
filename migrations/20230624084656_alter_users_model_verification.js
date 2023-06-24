export async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.bigint('verifyExpires').alter()
    table.specificType('verifyChanges','varchar[]').alter()
    table.bigint('resetAttempts')
    table.bigint('resetExpires').alter()
    table.string('resetShortToken').alter()
    table.string('resetToken').alter()
    table.string('verifyShortToken').alter()
    table.string('verifyToken').alter()
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.dropTable('users')
     
  })
}
