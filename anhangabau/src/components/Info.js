import axios from "axios";
import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import Pictures from "./Pictures";
import styled from "styled-components";
// eslint-disable-next-line react/prop-types
export default function Info({ street }) {
  const [info, setInfo] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const promise = axios.get(
      `https://projeto22-anhangabau.herokuapp.com/info/${street}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    promise.then((res) => {
      console.log(res.data);
      setInfo(res.data);
    });
    promise.catch(() => {
      alert("Algo deu errado! Tente novamente.");
    });
  }, [info]);

  return (
    <Container>
      <Item>
        {info.length > 0 ? (
          <Pictures info={info} />
        ) : (
          <h2>Ainda não há fotos dessa rua!</h2>
        )}
      </Item>
    </Container>
  );
}

const Container = styled.div``;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
