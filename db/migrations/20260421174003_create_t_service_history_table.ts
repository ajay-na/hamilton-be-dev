import { Knex } from 'knex';

const SERVICE_HISTORY_STATUS_ENUM = [
  'VEHICLE_ARRIVED',
  'JOB_CARD_CREATED',
  'RAMP_ALLOCATED',
  'IN_SERVICE',
  'WORK_COMPLETED',
  'COMPLETED',
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('t_service_history', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    table
      .uuid('service_record_id')
      .notNullable()
      .references('id')
      .inTable('t_service_record')
      .onDelete('CASCADE');
    table
      .enu('status', SERVICE_HISTORY_STATUS_ENUM, {
        useNative: true,
        enumName: 'service_history_status_enum',
      })
      .defaultTo(SERVICE_HISTORY_STATUS_ENUM[0])
      .notNullable();
    table.text('remarks');
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
  await knex.schema.dropTable('t_service_history');

  await knex.raw('DROP TYPE IF EXISTS service_history_status_enum');
}
