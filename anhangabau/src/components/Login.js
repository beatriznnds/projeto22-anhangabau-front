import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);

  function login(e) {
    e.preventDefault();
    const promise = axios.post("http://localhost:5001/login", {
      email: data.email,
      password: data.password,
    });
    promise.then((res) => {
      const { token } = res.data;
      localStorage.setItem(
        "userdata",
        JSON.stringify({
          name,
          token,
        })
      );
      setUser({ token });
      navigate("/home");
    });
    promise.catch((err) => {
      console.log(err);
      alert(err);
    });
  }
  return (
    <Container>
      <h1>
        Construindo <br />a memória
      </h1>
      <Form onSubmit={login}>
        <input
          type="email"
          placeholder="E-mail"
          value={data.email}
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={data.password}
          required
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button type="submit">Entrar</Button>
        <Link to="/signup">
          <p>Primeira vez? Cadastre-se!</p>
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
