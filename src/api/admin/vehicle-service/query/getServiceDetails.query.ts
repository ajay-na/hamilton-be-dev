export const getServiceDetailsQuery = `select 
  tsr.id,
  case 
    when tuv.id is not null then jsonb_build_object('id', tuv.id, 'name', tuv."name", 'license_plate', tuv.license_plate, 'odo_reading', tuv.odo_reading)
    else null 
  end as vehicle,
  case 
    when tu.id is not null then jsonb_build_object('id', tu.id, 'fname', tu.firstname, 'lname', tu.lastname)
    else null 
  end as user,
  case 
    when tu1.id is not null then jsonb_build_object('id', tu1.id, 'fname', tu1.firstname, 'lname', tu1.lastname)
    else null 
  end as advisor,
case 
    when tu2.id is not null then jsonb_build_object('id', tu2.id, 'fname', tu2.firstname, 'lname', tu2.lastname)
    else null 
  end as technician,
  tsr.odo_reading,
coalesce(
    jsonb_agg(jsonb_build_object('id',tsh.id,
    'status',tsh.status,
    'remarks',tsh.remarks,
    'created_at',tsh.created_at,
    'updated_at',tsh.updated_at
    )) filter (where tsh.id is not null), 
    '[]'::jsonb
  ) as service_history,
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
from t_service_record tsr 
left join t_user_vehicle tuv on tsr.t_vehicle_id = tuv.id and tuv.is_active = true
left join t_user tu on tsr.t_user_id = tu.id and tu.is_active = true
left join t_user tu1 on tsr.advisor_id = tu1.id and tu1.is_active = true
left join t_user tu2 on tsr.technician_id = tu2.id and tu2.is_active = true
left join t_service_history tsh on tsr.id = tsh.service_record_id 
where tsr.id = $1
group by tsr.id, tuv.id, tu.id, tu1.id, tu2.id;`;
