export const getAllServiceDetailsQuery = `
select 
  mst.id,
  mst.name,
  mst.capacity,
  mst.approx_service_time,
  mst.is_active,
  mst.description,
  mst.image_url
from m_service_type mst 
where mst.is_active = true;`;
