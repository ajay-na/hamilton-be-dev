import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('m_service_type').del();

  await knex('m_service_type').insert([
    {
      name: 'tyre work',
      capacity: 1,
    },
    {
      name: 'oil change',
      capacity: 3,
    },
    {
      name: 'suspension work',
      capacity: 3,
    },
    {
      name: 'brake pad service',
      capacity: 3,
    },
  ]);
}
