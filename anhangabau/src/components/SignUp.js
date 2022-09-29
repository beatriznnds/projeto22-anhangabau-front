import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
  const [data, setData] = useState({ email: "", name: "", password: "" });
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    const promise = axios.post("http://localhost:5001/signup", {
      email: data.email,
      name: data.name,
      password: data.password,
    });
    promise.then(() => {
      navigate("/");
    });
    promise.catch((err) => {
      console.log(err);
      alert("Algo deu errado! Tente novamente.");
    });
  }

  return (
    <Container>
      <h1>
        Construindo <br /> a memória
      </h1>
      <Form onSubmit={signup}>
        <input
          value={data.name}
          type="name"
          name="name"
          placeholder="Nome"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
        <input
          value={data.email}
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <input
          value={data.password}
          type="password"
          name="password"
          placeholder="Senha"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <Button type="submit">Cadastrar</Button>
        <Link to="/">
          <p>Já tem uma conta? Entre agora!</p>
        </Link>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background-color: #83b8ea;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  h1 {
    font-size: 65px;
    padding-left: 40px;
  }
  p {
    font-size: 15px;
    margin-top: 10px;
  }

  @media (max-width: 700px) {
    align-items: center;
    justify-content: center;
    position: absolute;
    button {
      height: 10%;
    }
    p {
      font-size: 18px;
    }
    h1 {
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 120px;
      left: 10px;
      width: 70%;
      height: 30%;
      margin: 0;
      font-size: 40px;
    }
  }
`;
const Form = styled.form`
  background-color: #c5d6e6;
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;

  input {
    width: 325px;
    height: 60px;
    font-size: 16px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 10px;
    padding-left: 10px;
    background-color: #ffffff;
  }
  &::placeholder {
    font-family: "Poppins";
    font-size: 20px;
    color: #000000;
  }

  @media (max-width: 700px) {
    width: 100vw;
    height: 70%;
    bottom: 0;
    input {
      height: 10%;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 325px;
  height: 45px;
  background-color: #395066;
  border-radius: 5px;
  font-size: 20px;
  color: #ffffff;
  margin-top: 25px;
`;
