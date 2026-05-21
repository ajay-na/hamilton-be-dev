export const getUpcomingServiceDetailsQuery = `select 
  tsb.id, 
  tsb.booking_date::date::text as booking_date, 
  json_build_object('id', ms.id, 'slot_timing', ms.slot_timing ) as slot_timing, 
  tsb.description  ,
  json_build_object('id', tu.id, 
    'fname', tu.firstname,
      'lname', tu.lastname , 
    'mob_no', tu.mobile_no , 
    'whataspp_no', tu.whatsapp_no
  ) as user,
  json_build_object('id', tuv.id, 
    'license_plate', tuv.license_plate , 
    'odo_reading', tuv.odo_reading )
   as vehicle,
  tsb.status 
from t_slot_booking tsb 
left join m_slots ms on tsb.slot_id = ms.id and ms.is_active = true
inner join t_service_record tsr on tsb.id != tsr.t_slot_id 
left join t_user tu on tsb.user_id = tu.id and tu.is_active= true
left join t_user_vehicle tuv on tsb.vehicle_id  = tuv.id and tuv.is_active = true
where tsb.booking_date = $1 and tsb.status ='confirmed' and tsb.is_active = true;`;
