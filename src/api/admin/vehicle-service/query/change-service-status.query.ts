export const addServiceHistoryQuery = `INSERT INTO t_service_history (
  service_record_id,
  status,
  remarks,
  created_by,
  updated_by
)
SELECT $1, $2, $3, $4, $4
WHERE NOT EXISTS (
  SELECT 1 
  FROM t_service_history 
  WHERE service_record_id = $1 
    AND status = $2 
)
RETURNING id;`;
