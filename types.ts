
export interface LabelData {
  mainCode: string;
  hubSubCode: string;
  resiNumber: string;
  serviceType: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  senderName: string;
  senderPhone: string;
  senderCity: string;
  district: string;
  subDistrict: string;
  village: string;
  weight: string;
  orderId: string;
  codCekDulu: string;
  batasKirim: string;
  isCashless: boolean;
  watermark: string;
}

export const INITIAL_LABEL_DATA: LabelData = {
  mainCode: "U - 46\"",
  hubSubCode: "TOM2-MH-11",
  resiNumber: "SPXID064356436531",
  serviceType: "ECO",
  recipientName: "Risna",
  recipientPhone: "081234567890",
  recipientAddress: "Mesjid Babul Jannah, Jalan Dusun Suggumanai, Biringbulu, BIRINGBULU, KAB. GOWA, SULAWESI SELATAN",
  senderName: "Kiara Jewelry",
  senderPhone: "6289692134050",
  senderCity: "KOTA SURABAYA",
  district: "KAB. GOWA",
  subDistrict: "BIRINGBULU",
  village: "Parangloe",
  weight: "6 gr",
  orderId: "2601179M0WA1WA",
  codCekDulu: "Ya",
  batasKirim: "19-01-2026",
  isCashless: true,
  watermark: "COD"
};
