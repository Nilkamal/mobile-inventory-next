export default async function getMobilesBySearch({
  mobile,
  storage,
  ram,
  brand,
}: MobileSearch): Promise<Mobile[]> {
  let query = "?";
  if (mobile) {
    query += `mobile=${mobile}&`;
  }

  if (storage) {
    query += `storage=${storage}&`;
  }
  if (ram) {
    query += `ram=${ram}&`;
  }
  if (brand) {
    query += `brand=${brand}&`;
  }
  const mobiles = await fetch(`/api/mobiles/${query}`, { cache: "no-store" });

  return mobiles.json();
}
