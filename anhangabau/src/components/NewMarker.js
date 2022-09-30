import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";

export default function NewMarker() {
  const navigate = useNavigate();
  const [data, setData] = useState({ latitude: "", longitude: "" });
  const { user } = useContext(UserContext);
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState("0");

  useEffect(() => {
    const promise = axios.get("http://localhost:5001/streets", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    promise.then((res) => {
      setStreets(res.data);
    });
  }, []);

  function handleSelectStreet(e) {
    setSelectedStreet(e.target.value);
  }

  function sendMarker(e) {
    e.preventDefault();
    console.log(selectedStreet);
    const promise = axios.post(
      "http://localhost:5001/coordinates",
      {
        latitude: data.latitude,
        longitude: data.longitude,
        streetName: selectedStreet,
      },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    promise.then(() => {
      navigate("/home");
    });
  }
  return (
    <Form onSubmit={sendMarker}>
      <input
        name="latitude"
        value={data.latitude}
        required
        onChange={(e) => setData({ ...data, latitude: e.target.value })}
      />
      <input
        name="longitude"
        value={data.longitude}
        required
        onChange={(e) => setData({ ...data, longitude: e.target.value })}
      />
      <select
        name="street"
        value={selectedStreet}
        onChange={handleSelectStreet}
      >
        <option value="0">Selecione uma rua</option>
        {streets.map((s, index) => (
          <option key={index} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>

      <Button type="submit">
        <p>Enviar novo marker</p>
      </Button>
      <Link to="/street">
        <p>Não encontrou a rua? Cadastre-a!</p>
      </Link>
    </Form>
  );
}

const Form = styled.form``;
const Button = styled.button``;
