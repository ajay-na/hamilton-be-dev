import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('m_spare').del();

  const brands = await knex('m_brand')
    .select('id', 'name')
    .whereIn('name', [
      'Denso Corporation',
      'Brembo S.p.A.',
      'NGK Spark Plug',
      'Michelin',
      'Mobil 1',
      'Bilstein',
    ]);

  const getBrandId = (name: string) => brands.find((b) => b.name === name)?.id;

  await knex('m_spare').insert([
    {
      name: 'Brake Pad Set',
      image_url: 'https://example.com/images/brake-pad.jpg',
      price: 450000,
      note: 'High durability ceramic pads',
      m_brand_id: getBrandId('Michelin'),
      is_active: true,
    },
    {
      name: 'Oil Filter',
      image_url: 'https://example.com/images/oil-filter.jpg',
      price: 85000,
      note: 'Genuine synthetic oil filter',
      m_brand_id: getBrandId('Bilstein'),
      is_active: true,
    },
    {
      name: 'Spark Plug Platinum',
      image_url: 'https://example.com/images/spark-plug.jpg',
      price: 120000,
      note: 'Long-life platinum tip',
      m_brand_id: getBrandId('NGK Spark Plug'),
      is_active: true,
    },
    {
      name: 'Air Filter',
      image_url: null,
      price: 150000,
      note: 'Standard replacement air filter',
      m_brand_id: getBrandId('NGK Spark Plug'),
      is_active: true,
    },
  ]);
}
