export const getAllSparesQuery = `
  SELECT 
    ms.id, 
    ms.name, 
    ms.image_url, 
    ms.price, 
    ms.note, 
    json_build_object(
      'id', mb.id,
      'name', mb.name,
      'image_url', mb.brand_logo
    ) as m_brand,
    ms.created_by, 
    ms.updated_by, 
    ms.created_at, 
    ms.updated_at
  FROM m_spare ms
  left join m_brand mb on ms.m_brand_id = mb.id and mb.is_active = true
  WHERE ms.is_active = true
  ORDER BY ms.created_at DESC;
`;
