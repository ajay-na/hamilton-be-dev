import { Knex } from 'knex';

const SERVICE_STATUSES = [
  'pending',
  'scheduled',
  'in_progress',
  'completed',
  'cancelled',
];
const PAYMENT_STATUSES = ['pending', 'paid', 'partially_paid', 'refunded'];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('t_service_record', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('t_vehicle_id')
      .references('id')
      .inTable('t_user_vehicle')
      .onDelete('SET NULL');
    table
      .uuid('t_user_id')
      .references('id')
      .inTable('t_user')
      .onDelete('SET NULL');
    table.date('booking_date');
    table.string('slot_timing');
    table
      .uuid('advisor_id')
      .references('id')
      .inTable('t_user')
      .onDelete('SET NULL');
    table
      .uuid('technician_id')
      .references('id')
      .inTable('t_user')
      .onDelete('SET NULL');
    table
      .enu('service_status', SERVICE_STATUSES, {
        useNative: true,
        enumName: 'service_status_enum',
      })
      .defaultTo('pending');
    table
      .enu('payment_status', PAYMENT_STATUSES, {
        useNative: true,
        enumName: 'payment_status_enum',
      })
      .defaultTo('pending');

    table.specificType('slot_timing', 'TIMESTAMPTZ');
    table.specificType('service_in_time', 'TIMESTAMPTZ');
    table.specificType('service_out_time', 'TIMESTAMPTZ');
    table.integer('odo_reading');
    table.text('note');

    table.decimal('total_parts_cost', 10, 2).defaultTo(0);
    table.decimal('total_labor_cost', 10, 2).defaultTo(0);
    table.decimal('grand_total', 10, 2).defaultTo(0);
    table.decimal('discount', 10, 2).defaultTo(0);

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
  await knex.schema.dropTable('t_service_record');
  await knex.raw('DROP TYPE IF EXISTS service_status_enum');
  await knex.raw('DROP TYPE IF EXISTS payment_status_enum');
}
