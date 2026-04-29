import { UpdateUserVehicleDto } from '../dto/update-vehicle-user.dto';

export interface UpdateQueryResponse {
  query: string;
  values: unknown[];
}

export const userVehicleUpdateQuery = (
  vehicleId: string,
  updateData: UpdateUserVehicleDto,
  userId: string,
): UpdateQueryResponse => {
  const entries = Object.entries(
    updateData as unknown as Record<string, unknown>,
  ).filter(
    ([, value]) => value !== undefined && value !== null && value !== '',
  );

  if (entries.length === 0) {
    throw new Error('No valid fields provided for update');
  }

  const setClause = entries
    .map(([key], index) => `${key} = $${index + 1}`)
    .join(', ');

  const values: unknown[] = entries.map(([, value]) => value);

  const query = `
    UPDATE t_user_vehicle 
    SET ${setClause}, updated_at = NOW(), updated_by = $${entries.length + 2} 
    WHERE id = $${entries.length + 1} AND is_active = true
    RETURNING *;
  `;

  values.push(vehicleId);
  values.push(userId);

  return { query, values };
};
