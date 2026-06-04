import { BadRequestException } from '@nestjs/common';
import { UpdateCostReqBodyDto } from '../dto/update-cost-for-service.dto';

export const getCostUpdateQuery = (
  body: UpdateCostReqBodyDto,
  currentUser: string,
  itemId: string,
) => {
  const updates: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (body.spare_part_id !== undefined) {
    updates.push(`spare_part_id = $${idx++}`);
    values.push(body.spare_part_id);
  }
  if (body.item_name !== undefined) {
    updates.push(`item_name = $${idx++}`);
    values.push(body.item_name);
  }
  if (body.type !== undefined) {
    updates.push(`type = $${idx++}`);
    values.push(body.type);
  }
  if (body.quantity !== undefined) {
    updates.push(`quantity = $${idx++}`);
    values.push(body.quantity);
  }
  if (body.unit_price !== undefined) {
    updates.push(`unit_price = $${idx++}`);
    values.push(body.unit_price);
  }
  if (body.total_price !== undefined) {
    updates.push(`total_price = $${idx++}`);
    values.push(body.total_price);
  }
  if (body.note !== undefined) {
    updates.push(`note = $${idx++}`);
    values.push(body.note);
  }

  if (updates.length === 0) {
    throw new BadRequestException('No fields to update');
  }

  updates.push(`updated_by = $${idx++}`);
  values.push(currentUser);

  values.push(itemId);
  const query = `
        UPDATE t_service_item
        SET ${updates.join(', ')}
        WHERE id = $${idx}
        RETURNING id;
      `;
  return { query, values };
};
