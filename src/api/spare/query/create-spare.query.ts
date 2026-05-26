export const createSpareQuery = `
  INSERT INTO m_spare (name, image_url, price, note, m_brand_id, created_by, updated_by)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id;
`;
