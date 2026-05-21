export const userSoftDeleteQuery = `UPDATE t_user tu 
  SET
    is_active = false,
    updated_at = NOW(), 
    updated_by = $2
  WHERE tu.id =$1
  RETURNING id, username, firstname, lastname, email, 
    gender, address, image_url, role_id, is_active, created_at, 
    updated_at;`;
