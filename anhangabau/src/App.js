import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";

const position = [-23.5478, -46.6446];

function App() {
  return (
    <>
      <h1>TITULO</h1>
      <Container>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>I am a pop-up!</Popup>
          </Marker>
        </MapContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
