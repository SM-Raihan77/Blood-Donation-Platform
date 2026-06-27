"use server";

export async function getFundingHistory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/funding`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}