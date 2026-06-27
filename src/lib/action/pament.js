"use server";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const subscription = async (data) => {
  try {
    const res = await fetch(`${baseURL}/api/funding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to add funding");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
};