import { validate } from "@/actions/validate";
import axios from "axios";
import Cookies from "js-cookie";

const fetchData = async (
  eventType: string,
  ref?: string,
  utm_source?: string,
  additionalData?: string
) => {
  try {
    const isAdmin: boolean = await validate(ref || "");
    if (isAdmin) return console.log("admin");

    const token = Cookies.get(eventType);
    if (token === eventType) return;

    const serverUrl = process.env.NEXT_PUBLIC_API!;
    const res = await axios.post(serverUrl, {
      eventType: eventType.trim(),
      ref,
      utm_source,
      additionalData: JSON.stringify(additionalData),
    });

    const { error } = res.data;
    if (!error) {
      Cookies.set(eventType, eventType);
    }
  } catch (error) {
    console.error("Error in fetchData:", error);
  }
};

export default fetchData;
