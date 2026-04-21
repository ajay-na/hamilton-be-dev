import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('t_user_vehicle').del();
  const users = await knex('t_user').select('id').limit(2);
  const vehicles = await knex('m_vehicle').select('id').limit(2);

  if (users.length < 1 || vehicles.length < 1) {
    console.warn('Skipping seed: Ensure t_user and m_vehicle have data first.');
    return;
  }

  await knex('t_user_vehicle').insert([
    {
      name: 'Daily Commuter',
      image_url: 'https://example.com/images/bike1.jpg',
      note: 'Main vehicle used for office runs.',
      license_plate: 'kl07a111',
      manufactured_year: '2024',
      odo_reading: 1000,
      m_vehicle_id: vehicles[0].id,
      t_user_id: users[0].id,
      created_by: users[0].id,
      updated_by: users[0].id,
      is_active: true,
    },
    {
      name: 'Weekend Cruiser',
      image_url: 'https://example.com/images/car2.jpg',
      note: 'Used for highway trips and weekend getaways.',
      license_plate: 'kl07a111',
      manufactured_year: '2017',
      odo_reading: 20222,
      m_vehicle_id: vehicles[1].id,
      t_user_id: users[0].id,
      created_by: users[0].id,
      updated_by: users[0].id,
      is_active: true,
    },
  ]);
}
