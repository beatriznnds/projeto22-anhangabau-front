import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      "https://projeto22-anhangabau.herokuapp.com/coordinates",
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
    promise.catch((e) => {
      console.log(e);
    });
  }
  return (
    <Container>
      <Form onSubmit={sendMarker}>
        <Part>
          <input
            name="latitude"
            value={data.latitude}
            required
            placeholder="latitude"
            onChange={(e) => setData({ ...data, latitude: e.target.value })}
          />
          <input
            name="longitude"
            placeholder="longitude"
            value={data.longitude}
            required
            onChange={(e) => setData({ ...data, longitude: e.target.value })}
          />
        </Part>
        <Part>
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
        </Part>
        <Part>
          <Button type="submit">
            <p>Enviar novo marker</p>
          </Button>
        </Part>
        <Part>
          <Link to="/street">
            <p>Não encontrou a rua? Cadastre-a!</p>
          </Link>
        </Part>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #9ec7ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    padding: 5px;
    margin: 5px;
  }
`;
const Button = styled.button`
  width: 200px;
  height: 30px;
`;

const Part = styled.div`
  margin: 10px;
`;
