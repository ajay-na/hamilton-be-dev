export const getVehicleDetailsByIdQuery = `SELECT
  tuv.id,
  mv."name",
  tuv.name AS nickname,
  mb.name AS brand_name,
  COALESCE(tuv.image_url ,mv.image_url) AS image_url,
  tuv.note,
  tuv.license_plate,
  tuv.manufactured_year,
  tuv.odo_reading,
  tuv.m_vehicle_id,
  tuv.t_user_id,
  jsonb_build_object(
    'last_service_date', latest_service.service_out_time ,
    'last_service_duration', latest_service.serivce_time ,
    'avrg_service_duration', average_service_time.avg_service_duration
  ) as service_details,
  tuv.created_by,
  tuv.updated_by,
  tuv.created_at,
  tuv.updated_at,
  tuv.is_active  
FROM t_user_vehicle tuv 
LEFT JOIN m_vehicle mv ON tuv.m_vehicle_id = mv.id 
LEFT JOIN m_brand mb ON mv.m_brand_id = mb.id 
LEFT JOIN  LATERAL (
  SELECT 
    service_out_time, 
    (tsr.service_out_time - tsr.service_in_time ) as serivce_time 
  FROM t_service_record tsr where tuv.id = tsr.t_vehicle_id limit 1) 
latest_service on true  
LEFT JOIN  LATERAL (
  SELECT 
    AVG(service_out_time - service_in_time) AS avg_service_duration
  FROM t_service_record
  WHERE t_vehicle_id = tuv.id
  AND service_out_time IS NOT NULL
) average_service_time on true
WHERE tuv.id = $2 and tuv.t_user_id = $1;
`;
