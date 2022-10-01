/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import { useMapEvents } from "react-leaflet";
import Modal from "react-modal";
// eslint-disable-next-line react/prop-types
export default function AddMarker() {
  const [newMarker, setNewMarker] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState("0");
  const [formIsOpen, setFormIsOpen] = useState(false);

  useMapEvents({
    click: (e) => {
      setFormIsOpen(!formIsOpen);
      setNewMarker(e.latlng);
    },
  });

  function openModal() {
    setFormIsOpen(true);
  }

  function closeModal() {
    setFormIsOpen(false);
  }

  console.log(newMarker);
  console.log(formIsOpen);

  useEffect(() => {
    const promise = axios.get(
      "https://projeto22-anhangabau.herokuapp.com/streets",
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    promise.then((res) => {
      setStreets(res.data);
    });
  }, []);

  function handleSelectStreet(e) {
    setSelectedStreet(e.target.value);
  }
  console.log(newMarker.lat);
  console.log(newMarker.lng);
  console.log(selectedStreet);

  function sendMarker(e) {
    e.preventDefault();
    const promise = axios.post(
      "http://localhost:5001/coordinates",
      {
        latitude: newMarker.lat,
        longitude: newMarker.lng,
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
      {formIsOpen ? (
        <Modal
          isOpen={openModal}
          ariaHideApp={false}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <Form onSubmit={sendMarker}>
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
        </Modal>
      ) : (
        <></>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    padding: 5px;
    margin: 5px;
    width: 10px;
    height: 40px;
  }
`;
const Button = styled.button`
  width: 200px;
  height: 30px;
`;

const Part = styled.div`
  margin: 10px;
  p {
    color: #fff;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;
