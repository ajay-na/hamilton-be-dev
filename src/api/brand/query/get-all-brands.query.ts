export const getAllBrandsQuery = `SELECT 
    mb.id,
    mb.name,
    mb.short_form,
    mb.brand_logo,
    mb.type,
    mb.note,
    jsonb_build_object('id', tu.id, 'name', tu.firstname) AS created_by,
    jsonb_build_object('id', tu1.id, 'name', tu1.firstname) AS updated_by,
    mb.created_at,
    mb.updated_at,
    mb.is_active,
    COUNT(*) OVER() AS total_count
FROM m_brand mb 
LEFT JOIN t_user tu ON mb.created_by = tu.id 
LEFT JOIN t_user tu1 ON mb.updated_by = tu1.id  
ORDER BY mb.created_at DESC
LIMIT $1 OFFSET $2;`;
