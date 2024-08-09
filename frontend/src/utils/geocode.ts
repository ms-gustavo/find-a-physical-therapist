import axios from "axios";

const GEOCODE_URL = "https://nominatim.openstreetmap.org/search";

interface GeocodeResponse {
  lat: string;
  lon: string;
}

export async function geocodeAddress(
  address: string
): Promise<{ latitude: number; longitude: number }> {
  try {
    const response = await axios.get(GEOCODE_URL, {
      params: {
        q: address,
        format: "json",
        addressdetails: 1,
        limit: 1,
      },
    });

    const data = response.data[0] as GeocodeResponse;
    if (!data) {
      throw new Error("Address not found");
    }

    return {
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon),
    };
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    throw new Error("Unable to geocode address");
  }
}
