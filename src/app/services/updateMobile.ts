export default async function updateMobile(mobile: Mobile) {
  const request = await fetch(`/api/mobiles/${mobile._id}`, {
    method: "PUT",
    body: JSON.stringify(mobile),
  });
  return { data: await request.json(), status: request.status };
}
