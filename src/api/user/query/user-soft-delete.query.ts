export const userSoftDeleteQuery = `UPDATE t_user tu 
  SET
    is_active = false,
    updated_at = NOW(), 
    updated_by = $2
  WHERE tu.id =$1
  RETURNING *;`;
