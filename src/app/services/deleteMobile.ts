export default async function deleteMobile(id: String) {
  const request = await fetch(`/api/mobiles/${id}`, {
    method: "DELETE",
  });

  return { data: await request.json(), status: request.status };
}
