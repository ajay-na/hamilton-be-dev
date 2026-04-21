import { Knex } from 'knex';
import { seed } from '../seeds/user_vehicle_data';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('t_user_vehicle', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name');
    table.string('image_url');
    table.text('note');
    table.text('license_plate');
    table.text('manufactured_year');
    table.integer('odo_reading');
    table
      .uuid('m_vehicle_id')
      .references('id')
      .inTable('m_vehicle')
      .onDelete('SET NULL');
    table
      .uuid('t_user_id')
      .references('id')
      .inTable('t_user')
      .onDelete('SET NULL');
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
    table.boolean('is_active').defaultTo(true);
  });
  await seed(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('t_user_vehicle');
}
