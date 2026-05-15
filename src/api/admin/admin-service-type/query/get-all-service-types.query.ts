export const getAllServiceDetailsQuery = `
select 
  mst.id,
  mst.name,
  mst.capacity,
  mst.approx_service_time,
  mst.is_active,
  mst.description,
  mst.image_url,
  jsonb_build_object(
    'id', tu.id,
    'fname', tu.firstname,
    'lname', tu.lastname
  ) as created_by,
  jsonb_build_object(
    'id', tu1.id,
    'fname', tu1.firstname,
    'lname', tu1.lastname
  ) as updated_by,
  mst.created_at,
  mst.updated_at
from m_service_type mst 
left join t_user tu on mst.created_by = tu.id
left join t_user tu1 on mst.updated_by = tu1.id
where mst.is_active = true;`;
