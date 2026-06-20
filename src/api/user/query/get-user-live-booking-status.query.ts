export const getUsersLiveServiceDetailsQuery = `
select tsr.id,json_build_object('id', tuv.id, 'license_plate', tuv.license_plate , 'odo_reading', tuv.odo_reading ) as vehicle,
tsr.service_in_time ,
tsr.service_out_time ,
tsr.service_status ,
tsr.total_labor_cost ,
tsr.total_parts_cost ,
tsr.grand_total,
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
left join t_service_history tsh on tsr.id = tsh.service_record_id 
where tsr.service_status = 'in_progress' and tsr.t_user_id = $1
group by tsr.id, tuv.id ;`;
