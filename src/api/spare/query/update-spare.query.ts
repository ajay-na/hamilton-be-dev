export const updateSpareQuery = `
  UPDATE m_spare
  SET 
    name = COALESCE($2, name),
    image_url = COALESCE($3, image_url),
    price = COALESCE($4, price),
    note = COALESCE($5, note),
    m_brand_id = COALESCE($6, m_brand_id),
    is_active = COALESCE($7, is_active),
    updated_by = $8,
    updated_at = NOW()
  WHERE id = $1
  RETURNING id;
`;
