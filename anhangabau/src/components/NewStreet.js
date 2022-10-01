import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

export default function NewStreet() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "" });
  const { user } = useContext(UserContext);
  const [setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function sendStreet(e) {
    e.preventDefault();
    const promise = axios.post(
      "https://projeto22-anhangabau.herokuapp.com/streets",
      {
        name: data.name,
      },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    promise.then(() => {
      navigate("/home");
    });
  }

  return (
    <Modal
      isOpen={openModal}
      ariaHideApp={false}
      onRequestClose={closeModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <Form onSubmit={sendStreet}>
        <input
          type="text"
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Button type="submit">
          <p>Enviar novo endereço de rua</p>
        </Button>
      </Form>
    </Modal>
  );
}

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
