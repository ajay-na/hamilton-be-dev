import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('m_vehicle').insert([
    {
      name: 'camry',
      variant: 'SE Hybrid',
      fuel: 'Hybrid',
      image_url:
        'https://image_urls.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
      service_interval_month: 6,
      service_interval_km: 10000,
      m_brand_id: '4729f632-8e1d-4c5a-b924-f7b822d6316a',
      note: 'Reliable daily driver',
      is_active: true,
    },
    {
      name: 'golf',
      variant: 'GTI',
      fuel: 'Petrol',
      image_url:
        'https://image_urls.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
      service_interval_month: 12,
      service_interval_km: 15000,
      m_brand_id: 'b9a3dc54-22ef-4109-8d77-6c30f412e9b1',
      note: 'Performance hatchback',
      is_active: true,
    },
    {
      name: 'ioniq 5',
      variant: 'Limited AWD',
      fuel: 'Electric',
      image_url:
        'https://image_urls.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
      service_interval_month: 24,
      service_interval_km: 24000,
      m_brand_id: 'a0f291c3-6b8d-4e25-97a1-5f04b39c2d78',
      note: 'High-speed charging support',
      is_active: true,
    },
    {
      name: 'mustang mach-e',
      variant: 'Premium',
      fuel: 'Electric',
      image_url:
        'https://image_urls.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
      service_interval_month: 12,
      service_interval_km: 16000,
      m_brand_id: '18e27405-d9cb-4fa1-bc62-3928a50f16d4',
      note: 'Electric SUV crossover',
      is_active: true,
    },
  ]);
}
