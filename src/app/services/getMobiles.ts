export default async function getMobiles(): Promise<Mobile[]> {
  debugger;
  const mobiles = await fetch("/api/mobiles", {
    cache: "no-store",
  });
  return mobiles.json();
}
