import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('t_denormalised_invoice', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('service_record_id')
      .notNullable()
      .references('id')
      .inTable('t_service_record')
      .onDelete('CASCADE');
    table.text('firstname');
    table.text('lastname');
    table.text('license_plate');
    table.text('mobile_no');
    table.integer('odo_reading');
    table.json('parts');
    table.decimal('parts_total');
    table.text('vehicle_brand');
    table.text('vehicle_brand_short');
    table.text('vehicle_name');
    table.text('whatsapp_no');
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
  await knex.schema.dropTable('t_denormalised_invoice');
}
