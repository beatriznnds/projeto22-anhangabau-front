import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";

export default function NewStreet() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "" });
  const { user } = useContext(UserContext);

  function sendStreet(e) {
    e.preventDefault();
    const promise = axios.post(
      "http://localhost:5001/streets",
      {
        name: data.name,
      },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    promise.then(() => {
      navigate("/marker");
    });
  }

  return (
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
  );
}

const Form = styled.form``;
const Button = styled.button``;
