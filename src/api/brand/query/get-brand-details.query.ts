export const getBrandDetailsByIdQuery = `SELECT 
    mb.id,
    mb.name,
    mb.short_form,
    mb.brand_logo,
    mb.note,
    mb.is_active,
    mb.type,
    CASE 
        WHEN mb.type = 'vehicle' THEN 
            COALESCE(jsonb_agg(DISTINCT jsonb_build_object('id', mv.id, 'name', mv.name, 'image_url', mv.image_url )) FILTER (WHERE mv.id IS NOT NULL), '[]')
        WHEN mb.type = 'spare' THEN 
            COALESCE(jsonb_agg(DISTINCT jsonb_build_object('id', ms.id, 'name', ms.name,'image_url',ms.image_url )) FILTER (WHERE ms.id IS NOT NULL), '[]')
        ELSE '[]'
    END AS related_items,
    jsonb_build_object('id', tu.id, 'name', tu.firstname) AS created_by,
    jsonb_build_object('id', tu2.id, 'name', tu2.firstname) AS updated_by,
    mb.created_at,
    mb.updated_at
FROM m_brand mb
LEFT JOIN t_user tu ON mb.created_by = tu.id 
LEFT JOIN t_user tu2 ON mb.updated_by = tu2.id 
LEFT JOIN m_vehicle mv ON mv.m_brand_id = mb.id and mv.is_active =true
LEFT JOIN m_spare ms ON ms.m_brand_id = mb.id and ms.is_active = true
WHERE mb.id = $1
GROUP BY mb.id, tu.id, tu.firstname, tu2.id, tu2.firstname;`;
