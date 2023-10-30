export default async function updateBrand(id: String, brand: String) {
  const request = await fetch(`/api/brands/${id}`, {
    method: "PUT",
    body: JSON.stringify({ brand }),
  });
  return { data: await request.json(), status: request.status };
}
