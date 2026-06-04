export const getDeleteInvoiceItemDetailsQuery = `
DELETE FROM t_service_item   
WHERE id = $1 
RETURNING id`;
