import { Knex } from 'knex';

const ITEM_TYPES = ['labor', 'part'];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('t_service_item', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    table
      .uuid('service_record_id')
      .notNullable()
      .references('id')
      .inTable('t_service_record')
      .onDelete('CASCADE');

    table
      .uuid('spare_part_id')
      .references('id')
      .inTable('m_spare')
      .onDelete('SET NULL');

    table.string('item_name').notNullable();
    table
      .enu('type', ITEM_TYPES, { useNative: true, enumName: 'item_type_enum' })
      .notNullable();
    table.decimal('quantity', 10, 2).notNullable().defaultTo(1);
    table.decimal('unit_price', 10, 2).notNullable().defaultTo(0);
    table.decimal('total_price', 10, 2).notNullable().defaultTo(0);
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
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('t_service_item');

  await knex.raw('DROP TYPE IF EXISTS item_type_enum');
}
