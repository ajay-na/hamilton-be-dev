export const getUserServicehistoryQuery = `select tsr.id, 
tsr.service_in_time::date::text as service_date, tsr.grand_total, tuv.id as vehicle_id,tuv.odo_reading,
mv."name" as vehicle_name
from t_service_record tsr 
left join t_user_vehicle tuv on tsr.t_vehicle_id = tuv.id
left join m_vehicle mv on tuv.m_vehicle_id = mv.id
where tsr.t_user_id =$1;`;
