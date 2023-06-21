export async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.boolean('isVerified').defaultTo(false)
    table.string('resetExpires')
    table.string('resetShortToken')
    table.string('resetToken')
    table.string('verifyChanges')
    table.string('verifyExpires')
    table.string('verifyShortToken')
    table.string('verifyToken')
   })
}

export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('isVerified')
        table.dropColumn('resetExpires')
    table.dropColumn('resetShortToken')
    table.dropColumn('resetToken')
    table.dropColumn('verifyChanges')
    table.dropColumn('verifyShortToken')
    table.dropColumn('verifyToken')

  })
}
