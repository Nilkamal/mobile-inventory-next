export default async function saveMobile(mobile: Mobile) {
  const response = await fetch(`/api/mobiles`, {
    method: "POST",
    body: JSON.stringify(mobile),
  });

  return { data: await response.json(), status: response.status };
}
