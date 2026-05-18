export const getLiveServiceDetailsQuery = `select tsr.id,json_build_object('id', tuv.id, 'license_plate', tuv.license_plate , 'odo_reading', tuv.odo_reading ) as vehicle,
json_build_object('id', tu.id, 'fname', tu.firstname, 'lname', tu.lastname , 'mob_no', tu.mobile_no , 'whataspp_no', tu.whatsapp_no  ) as user,
coalesce(
    jsonb_agg(jsonb_build_object('id',tsh.id,
    'status',tsh.status,
    'remarks',tsh.remarks,
    'created_at',tsh.created_at,
    'updated_at',tsh.updated_at
    )) filter (where tsh.id is not null), 
    '[]'::jsonb
  ) as service_history from t_service_record tsr 
left join t_user_vehicle tuv on tsr.t_vehicle_id = tuv.id and tuv.is_active = true
left join t_user tu on tsr.t_user_id = tu.id and tu.is_active = true
left join t_service_history tsh on tsr.id = tsh.service_record_id 
where tsr.service_status = 'in_progress' group by tsr.id, tuv.id,tu.id;`;
