import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('m_service_type').del();

  await knex('m_service_type').insert([
    {
      name: 'tyre work',
      approx_service_time: 1,
      capacity: 1,
    },
    {
      name: 'oil change',
      approx_service_time: 1,
      capacity: 3,
    },
    {
      name: 'suspension work',
      approx_service_time: 1,
      capacity: 3,
    },
    {
      name: 'brake pad service',
      approx_service_time: 1,
      capacity: 3,
    },
  ]);
}
