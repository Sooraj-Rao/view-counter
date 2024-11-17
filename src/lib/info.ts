import { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

export const GetData = async (request: NextRequest) => {
  const userAgent = request.headers.get("user-agent");
  const parser = new UAParser();
  parser.setUA(userAgent as string);
  const result = parser.getResult();

  console.log("Browser Info:", {
    name: result.browser.name,
    version: result.browser.version,
  });
  console.log("Device Info:", {
    model: result.device.model,
    type: result.device.type,
    vendor: result.device.vendor,
  });
  const deviceType = result.device.type || "unknown";
  console.log("Device Type:", deviceType);
  console.log("Engine Info:", {
    name: result.engine.name,
    version: result.engine.version,
  });
  console.log("OS Info:", {
    name: result.os.name,
    version: result.os.version,
  });
  console.log("CPU Architecture:", result.cpu.architecture);

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
