export const getInvoiceDataQuery = `SELECT 
    tsr.id, 
    tuv.license_plate, 
    tuv.odo_reading, 
    tu.firstname, 
    tu.lastname, 
    tu.mobile_no, 
    tu.whatsapp_no,
    COALESCE(costs.total_parts_cost, 0) AS total_parts_cost,
    COALESCE(costs.total_labor_cost, 0) AS total_labor_cost,
    COALESCE(costs.grand_total, 0) AS grand_total,
    (
        SELECT json_agg(json_build_object(
            'id', tsi.id,
            'item_name', tsi.item_name,
            'type', tsi."type",
            'spare_name', ms."name",
            'brand_name', mb."name",
            'brand_short', mb.short_form,
            'quantity', tsi.quantity,
            'unit_price', tsi.unit_price,
            'total_price', tsi.total_price
        ))
        FROM t_service_item tsi 
        LEFT JOIN m_spare ms ON tsi.spare_part_id = ms.id
        LEFT JOIN m_brand mb ON ms.m_brand_id = mb.id 
        WHERE tsi.service_record_id = tsr.id
    ) AS items
FROM t_service_record tsr 
LEFT JOIN t_user_vehicle tuv ON tsr.t_vehicle_id = tuv.id
LEFT JOIN t_user tu ON tsr.t_user_id = tu.id
LEFT JOIN LATERAL (
    SELECT 
        SUM(CASE WHEN tsi."type" = 'part' THEN tsi.total_price ELSE 0 END) AS total_parts_cost,
        SUM(CASE WHEN tsi."type" = 'labour' THEN tsi.total_price ELSE 0 END) AS total_labor_cost,
        SUM(tsi.total_price) AS grand_total
    FROM t_service_item tsi
    WHERE tsi.service_record_id = tsr.id
) costs ON true
WHERE tsr.id = $1;`;
