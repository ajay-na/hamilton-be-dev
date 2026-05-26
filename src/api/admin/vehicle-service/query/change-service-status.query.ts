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

export const addServiceCompletedQuery = `WITH update_cte as (
  UPDATE 
    t_service_record
  SET
    service_status = 'service_completed',
    updated_by = $4,
    updated_at = NOW()
  WHERE id = $1
  )
INSERT INTO t_service_history (
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
