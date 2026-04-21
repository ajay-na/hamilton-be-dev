export const searchVehiclesByNameAndBrandQuery = (
  name: string,
  brand?: string,
) => {
  let query = `SELECT 
    mv.id, mv.name 
  FROM m_vehicle mv 
  where mv.name like '%${name}%';`;
  return brand ? query + ` AND mv.m_brand_id ='${brand}';` : '';
};
