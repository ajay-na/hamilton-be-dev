import { AdminUpdateUserDto } from '../dto/update-user.dto';

export interface UpdateQueryResponse {
  query: string;
  values: unknown[];
}

export const userUpdateQuery = (
  id: string,
  updateData: AdminUpdateUserDto,
  updatedBy: string,
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
    UPDATE t_user 
    SET ${setClause}, updated_at = NOW(), updated_by = $${entries.length + 1} 
    WHERE id = $${entries.length + 2} AND is_active = true
    RETURNING id, username, firstname, lastname, email, 
    gender, address, image_url, role_id, is_active, created_at, 
    updated_at;
  `;

  values.push(updatedBy);
  values.push(id);

  return { query, values };
};
