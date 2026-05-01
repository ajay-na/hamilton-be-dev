import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('m_slots').del();

  await knex('m_slots').insert([
    { slot_timing: '08:00' },
    { slot_timing: '08:45' },
    { slot_timing: '09:30' },
    { slot_timing: '10:30' },
    { slot_timing: '11:15' },
    { slot_timing: '12:00' },
    { slot_timing: '03:00' },
    { slot_timing: '03:45' },
    { slot_timing: '04:30' },
    { slot_timing: '05:30' },
    { slot_timing: '06:15' },
    { slot_timing: '07:00' },
  ]);
}
