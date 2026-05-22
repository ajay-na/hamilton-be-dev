export const insertServiceItemQuery = `
  INSERT INTO t_service_item (
    service_record_id, 
    spare_part_id, 
    item_name, 
    type, 
    quantity, 
    unit_price, 
    total_price, 
    note, 
    created_by, 
    updated_by
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
  ) RETURNING *;
`;
