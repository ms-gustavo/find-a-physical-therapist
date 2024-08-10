import { ClientRegisterFormValues } from "./formSchemas";
import { geocodeAddress } from "./geocode";

export const transformAddressToLongLat = async (
  values: ClientRegisterFormValues
) => {
  const address = `${values.address.street}, ${values.address.number}, ${values.address.neighborhood}, ${values.address.city}, ${values.address.state}, Brazil`;
  const { longitude, latitude } = await geocodeAddress(address);

  return { longitude, latitude };
};
