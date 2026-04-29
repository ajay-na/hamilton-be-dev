export const getSlotsQuery = `
WITH slot_data AS (
    SELECT '09:00' AS slot_time UNION ALL SELECT '10:00' UNION ALL 
    SELECT '11:00' UNION ALL SELECT '12:00' UNION ALL SELECT '13:00' UNION ALL 
    SELECT '14:00' UNION ALL SELECT '15:00' UNION ALL SELECT '16:00' UNION ALL 
    SELECT '17:00'
),
booked_slots AS (
    SELECT slot_time, service, COUNT(id) AS service_count
    FROM bookings
    WHERE date = $1 AND status != 'cancelled'
    GROUP BY slot_time, service
),
service_grid AS (
    -- This creates a row for every slot+service combination
    SELECT sd.slot_time, mst.id as service_id, mst.name, mst.capacity
    FROM slot_data sd
    CROSS JOIN m_service_type mst
)
SELECT 
    sg.slot_time,
    json_agg(
        json_build_object(
            'service_name', sg.name,
            'service_id',sg.service_id ,
            'total_capacity', sg.capacity,
            'available_slot', CASE 
                WHEN o.id IS NOT NULL THEN 0 -- Override found, slot closed
                ELSE sg.capacity - COALESCE(bs.service_count, 0) 
            END
        )
    ) AS service_availability
FROM service_grid sg
LEFT JOIN booked_slots bs ON sg.slot_time = bs.slot_time AND sg.service_id  = bs.service
left join m_service_type mst on bs.service = mst.id 
LEFT JOIN m_service_slot_overrides o ON o.override_date = $1 AND o.start_time = sg.slot_time
where 
coalesce( (select count(id) from bookings where "date" = $1),0) <5 
GROUP BY sg.slot_time
ORDER BY sg.slot_time;`;

//bs.slot_time is null and
// and coalesce(bs.service_count ,0 ) < mst.capacity
