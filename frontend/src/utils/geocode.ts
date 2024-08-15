import axios from "axios";

const GEOCODE_URL = "https://nominatim.openstreetmap.org/search";
const REVERSE_GEOCODE_URL = "https://nominatim.openstreetmap.org/reverse";

interface GeocodeResponse {
  lat: string;
  lon: string;
}

interface ReverseGeocodeResponse {
  address: {
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
  display_name: string;
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

export async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number
): Promise<{
  road?: string;
  city?: string;
  state?: string;
  postcode?: string;
}> {
  try {
    const response = await axios.get(REVERSE_GEOCODE_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        format: "json",
        addressdetails: 1,
      },
    });

    const data = response.data as ReverseGeocodeResponse;
    const address = data.address;

    return {
      road: address.road,
      city: address.city,
      state: address.state,
      postcode: address.postcode,
    };
  } catch (error) {
    console.error("Error fetching reverse geocode data:", error);
    throw new Error("Unable to reverse geocode coordinates");
  }
}
