export default async function getBrands(): Promise<Brand[]> {
  const brands = await fetch("/api/brands", {
    cache: "no-store",
  });
  return brands.json();
}
