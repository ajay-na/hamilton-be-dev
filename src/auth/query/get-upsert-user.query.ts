export const getUpsertUserQuery = `INSERT INTO t_user (mobile_no, role_id) 
VALUES ($1, 3)
ON CONFLICT (mobile_no) 
DO UPDATE SET mobile_no = t_user.mobile_no
RETURNING id,mobile_no, role_id, email, firstname;`;
