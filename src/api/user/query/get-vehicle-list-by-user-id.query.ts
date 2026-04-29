export const getVehicleListByUserId = `SELECT
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
  tuv.created_by,
  tuv.updated_by,
  tuv.created_at,
  tuv.updated_at,
  tuv.is_active     
FROM t_user_vehicle tuv 
LEFT JOIN m_vehicle mv ON tuv.m_vehicle_id = mv.id 
LEFT JOIN m_brand mb ON mv.m_brand_id = mb.id 
WHERE tuv.t_user_id = $1;`;
