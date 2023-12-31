export default async function getMobiles(): Promise<Mobile[]> {
  const mobiles = await fetch("/api/mobiles", {
    cache: "no-store",
  });
  return mobiles.json();
}
