import axios from "axios";
import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import Pictures from "./Pictures";
import styled from "styled-components";
// eslint-disable-next-line react/prop-types
export default function Info({ street }) {
  const [info, setInfo] = useState([]);
  const { user } = useContext(UserContext);
  const [itensPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(info.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = info.slice(startIndex, endIndex);

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
  }, [info]);

  return (
    <Container>
      <Item>
        {currentItens.length > 0 ? (
          currentItens.map((data, index) => (
            <Pictures
              key={index}
              img={data.imageUrl}
              caption={data.caption}
              author={data.user.name}
              setCurrentPage={setCurrentPage}
              pages={pages}
            />
          ))
        ) : (
          <h2>Esse marker ainda não tem informações! </h2>
        )}
      </Item>
    </Container>
  );
}

const Container = styled.div``;
const Item = styled.div``;
