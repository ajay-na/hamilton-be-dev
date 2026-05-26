export const deleteSpareQuery = `
  UPDATE m_spare
  SET is_active = false, updated_by = $2, updated_at = NOW()
  WHERE id = $1
  RETURNING id;
`;
