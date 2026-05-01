import { seed } from 'db/seeds/service_type_data';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('m_service_type', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.integer('capacity').notNullable();
    table.integer('approx_service_time').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.string('description');
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
  await knex.schema.dropTable('m_service_type');
}
