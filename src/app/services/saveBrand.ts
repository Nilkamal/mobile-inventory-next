export default async function saveBrand(brand: String) {
  const request = await fetch(`/api/brands`, {
    method: "POST",
    body: JSON.stringify({ brand }),
  });
  return { data: await request.json(), status: request.status };
}
