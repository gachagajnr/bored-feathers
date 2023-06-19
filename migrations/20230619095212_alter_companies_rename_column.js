/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('companies', (table) => {
    table.renameColumn('companylocation', 'companyLocation')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('companies', (table) => {
    table.renameColumn('companyLocation', 'companylocation')
  })
}
