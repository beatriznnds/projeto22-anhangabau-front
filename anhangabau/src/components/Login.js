import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const { user, setUser } = useContext(UserContext);

  function Login(e) {
    e.preventDefault();
    const promise = axios.post("https://mywallet-13.herokuapp.com/login", {
      email: data.email,
      password: data.password,
    });
    promise.then((res) => {
      const { token, name } = res.data;
      localStorage.setItem(
        "userdata",
        JSON.stringify({
          name,
          token,
        })
      );
      setUser({ name, token });
      navigate("/menu");
    });
    promise.catch((err) => {
      console.log(err);
      alert(err);
    });
  }
}
