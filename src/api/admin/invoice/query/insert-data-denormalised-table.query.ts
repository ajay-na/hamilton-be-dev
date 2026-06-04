export const generateInvoiceAndUpdateAbcQuery = `
WITH company_details AS (
    SELECT 
      'Hamilton' AS company_name,
      'Kallarakal Square IX-206 Onnamile, Marthoma College Road' AS addressLine1,
      'Opposite JKB Bajaj Perumbavoor, Kerala 683542' AS addressLine2,
      '9895239218, 9745608089' AS company_phone,
      'd12982@baldealer.com' AS company_email,
      'https://example.com/assets/ktm-logo.png' AS company_logo_url
), basic_data AS (
    SELECT 
      tsr.id AS service_record_id, 
      tu.firstname, 
      tu.lastname,
      tu.mobile_no, 
      tu.whatsapp_no,
      tuv.license_plate,
      tuv.odo_reading,
      mv."name" AS vehicle_name,
      mb."name" AS vehicle_brand,
      mb.short_form AS vehicle_brand_short,
      tsr.service_in_time::date::text AS invoice_date 
    FROM t_service_record tsr 
    LEFT JOIN t_user_vehicle tuv ON tsr.t_vehicle_id = tuv.id
    LEFT JOIN t_user tu ON tsr.t_user_id = tu.id
    LEFT JOIN m_vehicle mv ON tuv.m_vehicle_id = mv.id
    LEFT JOIN m_brand mb ON mv.m_brand_id = mb.id
    WHERE tsr.id = $1
), item_cost AS (
    SELECT 
      tsi.item_name,
      tsi."type",
      ms."name",
      mb."name",
      mb.short_form,
      tsi.quantity,
      tsi.total_price,
      tsi.unit_price  
    FROM t_service_item tsi 
    LEFT JOIN m_spare ms ON tsi.spare_part_id = ms.id
    LEFT JOIN m_brand mb ON ms.m_brand_id = mb.id 
    WHERE tsi.service_record_id = $1
), aggregated_items AS (
    SELECT
      COALESCE(
        JSONB_AGG(
          JSONB_BUILD_OBJECT(
            'description', item_name,
            'qty', quantity,
            'unit_price', unit_price, 
            'total_price', total_price
          )
        ) FILTER (WHERE "type" = 'part'), '[]'::jsonb
      ) AS parts_array,
      COALESCE(
        JSONB_AGG(
          JSONB_BUILD_OBJECT(
            'description', item_name,
            'units', quantity,
            'unit_price', unit_price, 
            'total_price', total_price
          )
        ) FILTER (WHERE "type" = 'labour'), '[]'::jsonb
      ) AS labour_array,
      COALESCE(SUM(total_price) FILTER (WHERE "type" = 'part'), 0) AS raw_parts_total,
      COALESCE(SUM(total_price) FILTER (WHERE "type" = 'labour'), 0) AS raw_labour_total,
      COALESCE(SUM(total_price), 0) AS raw_grand_total
    FROM item_cost
), inserted_invoice AS (
    INSERT INTO t_denormalised_invoice (
        service_record_id,
        firstname,
        lastname,
        license_plate,
        mobile_no,
        odo_reading,
        parts,
        parts_total,
        vehicle_brand,
        vehicle_brand_short,
        vehicle_name,
        whatsapp_no,
        created_by,
        updated_by,
        created_at,
        updated_at
    )
    SELECT 
        b.service_record_id,
        b.firstname,
        b.lastname,
        b.license_plate,
        b.mobile_no,
        b.odo_reading,
        COALESCE(a.parts_array, '[]'::jsonb),
        a.raw_parts_total,
        b.vehicle_brand,
        b.vehicle_brand_short,
        b.vehicle_name,
        b.whatsapp_no,
        $2, 
        $2, 
        NOW(),
        NOW()
    FROM basic_data b, aggregated_items a
    ON CONFLICT (service_record_id) DO UPDATE 
    SET 
        firstname = EXCLUDED.firstname,
        lastname = EXCLUDED.lastname,
        license_plate = EXCLUDED.license_plate,
        mobile_no = EXCLUDED.mobile_no,
        odo_reading = EXCLUDED.odo_reading,
        parts = EXCLUDED.parts,
        parts_total = EXCLUDED.parts_total,
        vehicle_brand = EXCLUDED.vehicle_brand,
        vehicle_brand_short = EXCLUDED.vehicle_brand_short,
        vehicle_name = EXCLUDED.vehicle_name,
        whatsapp_no = EXCLUDED.whatsapp_no,
        updated_by = EXCLUDED.updated_by,
        updated_at = NOW()
    RETURNING id, service_record_id, parts_total, (
        SELECT raw_labour_total FROM aggregated_items
    ) AS labour_total, (
        SELECT raw_grand_total FROM aggregated_items
    ) AS grand_total
)
UPDATE t_service_record tsr
SET 
    is_invoice_generated = true,
    total_parts_cost = i.parts_total,
    total_labor_cost = i.labour_total,
    grand_total = i.grand_total,
    updated_by = $2,
    updated_at = NOW()
FROM inserted_invoice i
WHERE tsr.id = i.service_record_id
RETURNING i.id AS denormalised_invoice_id;
`;
