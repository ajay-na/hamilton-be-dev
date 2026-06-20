export const getUserBookingDetailsQuery = `SELECT 
    tsb.id,
    tsb.booking_date::date::text AS booking_date, 
    json_build_object('id', ms.id, 'slot_timing', ms.slot_timing) AS slot,
    tsb.description,
    tsb.status,
    json_build_object('id', mst.id, 'service_name', mst."name") AS service_type, -- Added missing alias
    json_build_object(
        'id', tuv.id, 
        'license_plate', tuv.license_plate, 
        'odo_reading', tuv.odo_reading
    ) AS vehicle_detail
FROM t_slot_booking tsb 
LEFT JOIN m_slots ms ON 
    tsb.slot_id = ms.id AND ms.is_active = true
LEFT JOIN m_service_type mst ON 
    tsb.service_type_id = mst.id AND mst.is_active = true
LEFT JOIN t_user_vehicle tuv ON 
    tsb.vehicle_id = tuv.id 
WHERE 
    tsb.user_id = $1
    AND tsb.is_active = true 
    AND tsb.booking_date >= CURRENT_DATE
    AND tsb.id NOT IN (
        SELECT tsr.t_slot_id  
        FROM t_service_record tsr 
        WHERE tsr.t_user_id = $1
          AND tsr.t_slot_id IS NOT NULL
    );;`;
