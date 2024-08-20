import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Therapist } from "@/app/therapists/all/page";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TherapistsMapProps {
  userLocation: [number, number];
  therapists: Therapist[];
}

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RenderTherapistsMap: React.FC<TherapistsMapProps> = ({
  userLocation,
  therapists,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={userLocation} icon={defaultIcon}>
        <Popup>Você está aqui</Popup>
      </Marker>
      {therapists.map((therapist, index) => (
        <Marker
          key={index}
          position={[
            therapist.location.coordinates[1],
            therapist.location.coordinates[0],
          ]}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{therapist.name}</strong>
            <br />
            {therapist.speciality.join(", ")}
            <br />
            Preço médio: R${therapist.mediumCost}
            <br />
            {therapist.address!.road}, {therapist.address!.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RenderTherapistsMap;
