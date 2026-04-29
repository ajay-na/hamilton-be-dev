import type { Knex } from 'knex';
import { seed } from '../seeds/service_type_data';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('m_service_type', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name');
    table.integer('capacity');
  });
  await seed(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('m_service_type');
}
