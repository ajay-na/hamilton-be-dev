export const insertServiceDetailsInitialQuery = `WITH inserted_service AS (
  INSERT INTO t_service_record (
    t_vehicle_id, 
    t_user_id, 
    t_slot_id, 
    advisor_id, 
    technician_id, 
    odo_reading, 
    note, 
    service_status, 
    payment_status, 
    created_by, 
    updated_by
  ) 
  VALUES ( 
    $1, 
    $2, 
    $3, 
    $4,
    $5, 
    $6, 
    $7,
    'in_progress', 
    'pending',   
    $8, 
    $8
  )
  RETURNING id, service_status
)
INSERT INTO t_service_history (
  service_record_id, 
  remarks, 
  created_by, 
  updated_by
)
SELECT 
  id, 
  $9, -- remarks (Text or NULL)
  $8, -- current_user_id
  $8  -- current_user_id
FROM inserted_service RETURNING t_service_history.id;
`;
