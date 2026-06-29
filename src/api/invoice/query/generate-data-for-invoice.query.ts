export const generateInvoiceDataQuery = `
select 
  'Hamilton' as company_name,
  'Kallarakal Square IX-206 Onnamile, Marthoma College Road' as addressLine1,
  'Opposite JKB Bajaj Perumbavoor, Kerala 683542' as addressLine2,
  '9895239218, 9745608089' as company_phone,
  'd12982@baldealer.com' as company_email,
  'https://example.com/assets/ktm-logo.png' as company_logo_url,
  tdi.service_record_id,
  tdi.firstname,
  tdi.lastname,
  tdi.license_plate,
  tdi.mobile_no,
  tdi.odo_reading,
  tdi.parts,
  tdi.parts_total,
  tdi.vehicle_brand,
  tdi.vehicle_brand_short,
  tdi.vehicle_name,
  tdi.whatsapp_no,
  tdi.created_by,
  tdi.updated_by,
  tdi.created_at,
  tdi.updated_at
  from t_denormalised_invoice tdi where tdi.service_record_id = $1
;
`;
