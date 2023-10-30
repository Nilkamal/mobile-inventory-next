export default async function getMobile(id: String) {
  const request = await fetch(`/api/mobiles/${id}`);

  return { data: await request.json(), status: request.status };
}
