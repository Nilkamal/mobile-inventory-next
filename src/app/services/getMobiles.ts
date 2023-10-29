export default async function getMobiles(): Promise<Mobile[]> {
  const mobiles = await fetch(`${process.env.API_URL}/api/mobiles`, {
    cache: "no-store",
  });
  return mobiles.json();
}
