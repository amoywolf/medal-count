import { MedalRecord } from "@/types/medal";
import { ERROR_MESSAGES } from "@/constants/messages";

// TODO: implement API module to fetch remote API data
export const fetchMedalData = async (): Promise<MedalRecord[]> => {
  try {
    // TODO: Now it's server side code with hardcoded hostname, should change to use client side code.
    const response = await fetch("http://localhost:3000/data/medals.json");
    if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    return await response.json();
  } catch (error) {
    // TODO: implement global error handler
    throw error;
  }
};