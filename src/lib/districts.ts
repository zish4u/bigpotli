export const PATNA = "Patna";

// Bihar districts with Muslim population > 20% (2011 Census) — Seemanchal/North Bihar
export const TIER1_DISTRICTS = [
  "Kishanganj",
  "Katihar",
  "Araria",
  "Purnia",
  "Darbhanga",
  "Pashchim Champaran",
  "Sitamarhi",
];

// 15-20% Muslim population
export const TIER2_DISTRICTS = [
  "Siwan",
  "Supaul",
  "Madhubani",
  "Bhagalpur",
  "Gopalganj",
  "Purba Champaran",
  "Muzaffarpur",
  "Sheohar",
];

// 10-15% Muslim population
export const TIER3_DISTRICTS = [
  "Saharsa",
  "Begusarai",
  "Jamui",
  "Banka",
  "Madhepura",
  "Gaya",
  "Nawada",
  "Khagaria",
  "Samastipur",
  "Saran",
  "Rohtas",
];

export const ALL_BIHAR_DISTRICTS = [
  PATNA,
  ...TIER1_DISTRICTS,
  ...TIER2_DISTRICTS,
  ...TIER3_DISTRICTS,
];
