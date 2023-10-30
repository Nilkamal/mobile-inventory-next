export default async function getBrand(id: String) {
  const request = await fetch(`/api/brands/${id}`);
  return request.json();
}
