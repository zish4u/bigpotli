export const siteConfig = {
  name: "Bigpotli",
  url: "https://bigpotli.com",
  email: "support@bigpotli.com",
  address: {
    street:
      "Shop No-2, Hashmi Villa, near Mirza Ghalib Teacher's Training College, Indirapuri Colony, Raja Bazar, Indrapuri",
    locality: "Patna",
    region: "Bihar",
    postalCode: "800014",
    country: "IN",
  },
  phone: {
    display: "062052 01601",
    href: "tel:+916205201601",
  },
  social: {
    instagram: "https://instagram.com/bigpotli" as string | null,
    facebook: null as string | null,
    youtube: "https://www.youtube.com/@Bigpotli" as string | null,
  },
};

export function getFullAddress() {
  const { street, locality, region, postalCode } = siteConfig.address;
  return `${street}, ${locality}, ${region} ${postalCode}`;
}
