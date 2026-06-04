export const getCompletedServiceDetailsQuery = (
  isInvoiceGenerated: boolean,
) => {
  return `SELECT 
  tsb.id, 
  tsb.booking_date::date::text AS booking_date, 
  tsr.is_invoice_generated,
  json_build_object(
    'id', ms.id, 
    'slot_timing', ms.slot_timing 
  ) AS slot_timing, 
  tsb.description,
  json_build_object(
    'id', tu.id, 
    'fname', tu.firstname,
    'lname', tu.lastname, 
    'mob_no', tu.mobile_no, 
    'whataspp_no', tu.whatsapp_no
  ) AS user,
  json_build_object(
    'id', tuv.id, 
    'license_plate', tuv.license_plate, 
    'odo_reading', tuv.odo_reading 
  ) AS vehicle,
  tsr.service_status AS status,
  (
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'id', tsh.id,
      'status', tsh.status,
      'remarks', tsh.remarks,
      'created_at', tsh.created_at,
      'updated_at', tsh.updated_at
    )), '[]'::jsonb)
    FROM t_service_history tsh
    WHERE tsh.service_record_id = tsr.id
  ) AS service_history,
  (
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'id', tsi.id,
      'item_name', tsi.item_name,
      'type', tsi."type",
      'quantity', tsi.quantity,
      'unit_price', tsi.unit_price,
      'total_price', tsi.total_price,
      'note', tsi.note
    )), '[]'::jsonb)
    FROM t_service_item tsi
    WHERE tsi.service_record_id = tsr.id
  ) AS service_items
FROM t_service_record tsr
LEFT JOIN t_slot_booking tsb ON tsr.t_slot_id = tsb.id 
LEFT JOIN m_slots ms ON tsb.slot_id = ms.id AND ms.is_active = true
LEFT JOIN t_user tu ON tsb.user_id = tu.id
LEFT JOIN t_user_vehicle tuv ON tsb.vehicle_id = tuv.id
WHERE 
  tsr.service_in_time::date >= $1::date 
  OR tsr.service_in_time::date < ($1::date + INTERVAL '1 day')
  AND tsr.is_invoice_generated =
  ${isInvoiceGenerated ? 'TRUE' : 'FALSE'}
  AND tsr.service_status IN ('completed', 'service_completed');`;
};
