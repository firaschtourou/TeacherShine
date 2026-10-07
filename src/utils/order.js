export const DELIVERY_FEES = {
  Tunis: 9,
  Ariana: 9,
  "Ben Arous": 9,
  Manouba: 9,
  Nabeul: 9,
  Zaghouan: 9,
  Bizerte: 9,
  Béja: 9,
  Jendouba: 9,
  "Le Kef": 9,
  Siliana: 9,
  Sousse: 9,
  Monastir: 9,
  Mahdia: 9,
  Sfax: 9,
  Kairouan: 9,
  Kasserine: 9,
  "Sidi Bouzid": 9,
  Gabès: 9,
  Médenine: 9,
  Tataouine: 9,
  Gafsa: 9,
  Tozeur: 9,
  Kébili: 9,

  DEFAULT: 9,
};

export function getDeliveryFee(city) {
  if (!city) {
    return DELIVERY_FEES.DEFAULT;
  }

  const normalizedCity = city.trim();

  return (
    DELIVERY_FEES[normalizedCity] ??
    DELIVERY_FEES.DEFAULT
  );
}

export function formatPrice(price) {
  return `${Number(price).toFixed(3)} DT`;
}