import { Knex } from 'knex';
import { seed } from '../seeds/brand_table_data';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('m_brand', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('short_form', 10);
    table.string('brand_logo');
    table.enum('type', ['spare', 'vehicle'], {
      useNative: true,
      enumName: 'brand_type',
    });
    table.text('note');
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
  await knex.schema.dropTable('m_brand');
  await knex.raw('DROP TYPE public.brand_type;');
}
