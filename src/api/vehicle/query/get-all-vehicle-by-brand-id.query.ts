export const getAllVehicleByBrandIdQuery = `SELECT 
  mv.id,
  mv.name
FROM m_vehicle mv
LEFT JOIN t_user tu ON mv.created_by = tu.id 
LEFT JOIN t_user tu1 ON mv.updated_by = tu1.id 
where mv.m_brand_id =$1;;`;
