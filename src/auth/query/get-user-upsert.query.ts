export const getUpsertUserQuery = `with insert_data as (INSERT INTO t_user (mobile_no, role_id) 
VALUES ('12345678901', 3)
ON CONFLICT (mobile_no) 
DO UPDATE SET mobile_no = t_user.mobile_no
RETURNING id,mobile_no, role_id, email, firstname)
SELECT 
  i.id,
  i.mobile_no, 
  i.email, 
  i.role_id, 
  i.firstname,
  CASE 
    WHEN i.email IS NOT NULL AND i.firstname IS NOT NULL THEN true
    ELSE false
  END AS is_profile_completed,
  CASE 
    WHEN bool_or(tuv.id IS NOT NULL) THEN true
    ELSE false
  END AS is_vehicle_added
FROM insert_data i
LEFT JOIN t_user_vehicle tuv ON i.id = tuv.t_user_id
GROUP BY i.id ,i.mobile_no, i.email, i.role_id, i.firstname;
`;
