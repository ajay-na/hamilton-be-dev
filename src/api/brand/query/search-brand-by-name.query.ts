export const searchBrandByNameQuery = (name: string) =>
  `SELECT 
  mb.id,
  mb.name
FROM m_brand mb WHERE mb."name" LIKE '%${name}%';`;
