import axios from "axios";
import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
export default function Info({ street }) {
  const [info, setInfo] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const promise = axios.get(`http://localhost:5001/info/${street}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    promise.then((res) => {
      console.log(res.data);
      setInfo(res.data);
    });
    promise.catch(() => {
      alert("Algo deu errado! Tente novamente.");
    });
  }, []);

  return (
    <Container>
      {info.map((data) => (
        <>
          <img src={data.imageUrl} />
          <h3>{data.caption}</h3>
          <h4>Postado por {data.user.name}</h4>
        </>
      ))}
    </Container>
  );
}

const Container = styled.div``;
