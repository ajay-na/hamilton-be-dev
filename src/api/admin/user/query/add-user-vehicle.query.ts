export const addUserVehicleQuery = `INSERT INTO t_user_vehicle (
    name, 
    note, 
    license_plate, 
    manufactured_year, 
    odo_reading, 
    m_vehicle_id, 
    t_user_id, 
    created_by, 
    updated_by
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
