import { NextRequest } from "next/server";

export const GetData = async (request: NextRequest) => {
  console.log("1", request.headers.get("x-forwarded-for"));
  console.log("2", request.ip);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || request.ip;

  console.log("IP Address:", ip);

  if (ip) {
    try {
      const geoLocationResponse = await fetch(
        `https://ipinfo.io/${ip}/json?token=447e998db3bc9b`
      );
      const geoData = await geoLocationResponse.json();

      console.log("Location Info:", geoData);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  } else {
    console.log("IP address not found");
  }
};
