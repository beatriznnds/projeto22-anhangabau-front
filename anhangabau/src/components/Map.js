import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Info from "./Info";
import Add from "./Add";
import styled from "styled-components";

import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Map() {
  const initialPosition = [-23.5446754, -46.6361352];
  const [positions, setPositions] = useState([]);
  const { user } = useContext(UserContext);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const promise = axios.get(
      "https://projeto22-anhangabau.herokuapp.com/coordinates",
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    promise.then((res) => {
      setPositions(res.data);
    });
    promise.catch(() => {
      alert("Algo deu errado! Tente novamente.");
    });
  }, []);

  function handleMapClick(e) {
    const { lat: latidude, lng: longitude } = e.latlng;
    setSelectedPosition([latidude, longitude]);
  }

  function open() {
    return setDisabled(false);
  }

  return (
    <Container>
      <MapContainer
        center={initialPosition}
        zoom={60}
        scrollWheelZoom={true}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((p) => (
          <>
            <Marker position={[p.latitude, p.longitude]}>
              <Popup className="custom-popup" id="map">
                <Info street={p.street.id} />
                {disabled ? (
                  <Button onClick={open}>+</Button>
                ) : (
                  <Add position={selectedPosition} street={p.street.id} />
                )}
              </Popup>
            </Marker>
          </>
        ))}
      </MapContainer>
      <Link to="/marker">
        <h2>Adicione um novo marker!</h2>
      </Link>
    </Container>
  );
}

const Button = styled.button`
  background-color: black;
  border: none;
  border-radius: 5px;
  display: flex;
  color: white;
  padding: 5px;
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const Container = styled.div`
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
  }
`;
