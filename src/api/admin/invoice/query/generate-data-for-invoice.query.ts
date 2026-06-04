export const generateInvoiceDataQuery = `with company_details as (
select 
  'Hamilton' as company_name,
  'Kallarakal Square IX-206 Onnamile, Marthoma College Road' as addressLine1,
  'Opposite JKB Bajaj Perumbavoor, Kerala 683542' as addressLine2,
  '9895239218, 9745608089' as company_phone,
  'd12982@baldealer.com' as company_email,
  'https://example.com/assets/ktm-logo.png' as company_logo_url
), basic_data as(
 select 
  tsr.id as service_record_id, 
  tu.firstname , 
  tu.lastname ,
  tu.mobile_no , 
  tu.whatsapp_no ,
  tuv.license_plate ,
  tuv.odo_reading,
  mv."name" as vehicle_name ,
  mb."name" as vehicle_brand ,
  mb.short_form as vehicle_brand_short,
  tsr.service_in_time::date::text as invoice_date 
 from t_service_record tsr 
 left join t_user_vehicle tuv on tsr.t_vehicle_id = tuv.id
 left join t_user tu on tsr.t_user_id = tu.id
 left join m_vehicle mv on tuv.m_vehicle_id = mv.id
 left join m_brand mb on mv.m_brand_id = mb.id
 where tsr.id =$1),
 item_cost as (
 select tsi.item_name ,tsi."type" ,ms."name", mb."name", mb.short_form  , tsi.quantity , tsi.total_price , tsi.unit_price  
 from t_service_item tsi 
 left join m_spare ms on tsi.spare_part_id = ms.id
 left join m_brand mb on ms.m_brand_id = mb.id 
 where
 tsi.service_record_id = $1),
 aggregated_items as (
  select
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'description', item_name,
          'qty', quantity,
              'unit_price', unit_price, 
          'total_price', total_price
        )
      ) filter (where "type" = 'part'), '[]'::jsonb
    ) as parts_array,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'description', item_name,
          'units', quantity,
          'unit_price', unit_price, 
          'total_price', total_price
        )
      ) filter (where "type" = 'labour'), '[]'::jsonb
    ) as labour_array,
    -- Calculate numeric sums within the aggregation step
    coalesce(sum(total_price) filter (where "type" = 'part'), 0) as raw_parts_total,
    coalesce(sum(total_price) filter (where "type" = 'labour'), 0) as raw_labour_total,
    coalesce(sum(total_price), 0) as raw_grand_total
  from item_cost
)
 select 
  c.*,
  b.*,
  coalesce(a.parts_array, '[]'::jsonb) as parts,
  coalesce(a.labour_array, '[]'::jsonb) as labour,
 a.raw_parts_total as parts_total,
 a.raw_labour_total as labour_total,
 a.raw_grand_total as grand_total
from company_details c, basic_data b, aggregated_items a;
`
