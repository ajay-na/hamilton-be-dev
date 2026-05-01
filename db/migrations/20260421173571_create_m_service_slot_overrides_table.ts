import type { Knex } from 'knex';
import { seed } from '../seeds/service_type_data';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('m_service_slot_overrides', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.date('override_date');
    table.specificType('start_time', 'TIMESTAMPTZ');
    table.specificType('end_time', 'TIMESTAMPTZ');
    table.string('description');
    table.boolean('is_blocked').defaultTo(true);
    table
      .uuid('created_by')
      .references('id')
      .inTable('t_user')
      .onDelete('SET NULL');
    table
      .uuid('updated_by')
      .references('id')
      .inTable('t_user')
      .onDelete('SET NULL');
    table
      .specificType('created_at', 'TIMESTAMPTZ')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .specificType('updated_at', 'TIMESTAMPTZ')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  await seed(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('m_service_slot_overrides');
}
