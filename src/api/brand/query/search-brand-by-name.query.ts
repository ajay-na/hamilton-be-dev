import { SearchBrandByNameDto } from '../dto/search-brand-by-name.dto';

export const searchBrandByNameQuery = (params: SearchBrandByNameDto) => {
  const { type, name } = params;

  let query = `SELECT mb.id, mb.name, mb."type" FROM m_brand mb`;
  const conditions: string[] = [];
  const values: any[] = [];
  let count = 1;

  if (name) {
    conditions.push(`mb."name" ILIKE $${count}`);
    values.push(`%${name}%`);
    count++;
  }

  if (type !== undefined && type !== null) {
    conditions.push(`mb."type" = $${count}`);
    values.push(type);
    count++;
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  return {
    query: query + ';',
    values: values,
  };
};
