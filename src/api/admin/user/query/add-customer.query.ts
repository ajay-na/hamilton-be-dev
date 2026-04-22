export const addCustomerQuery = `INSERT INTO t_user (
  firstname,
  username,
  lastname,
  email,
  mobile_no,
  whatsapp_no,
  image_url,
  gender,
  dob,
  role_id,
  note,
  address,
  created_by,
  updated_by
) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`;
