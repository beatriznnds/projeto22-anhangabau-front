// import L from "leaflet";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIcon2x,
//   shadowUrl: markerShadow,
// });

// const initialPosition = [-23.5446754, -46.6361352];
// const [positions, setPositions] = useState([]);

// useEffect(() => {
//   const promise = axios.get("http://localhost:5000/coordinates", {
//     //headers: { Authorization: `Bearer ${user.token}` },
//   });
//   promise.then((res) => {
//     setPositions(res.data);
//     console.log(res.data);
//   });
//   promise.catch((err) => {
//     console.log(err);
//     alert("Unable to delete post. Try again!");
//   });
// }, [positions]);

// export default function Map() {
//   return (
//     <MapContainer center={initialPosition} zoom={60} scrollWheelZoom={true}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {positions.map((p) => {
//         <Marker position={p}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>;
//       })}
//     </MapContainer>
//   );
// }
