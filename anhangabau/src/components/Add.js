import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
export default function Add({ street }) {
  const [post, setPost] = useState({ imageUrl: "", caption: "" });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(street);
  function newPost(e) {
    console.log(street);
    e.preventDefault();
    const promise = axios.post(
      "https://projeto22-anhangabau.herokuapp.com/info",
      { imageUrl: post.imageUrl, caption: post.caption, streetId: street },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    promise.then(() => {
      navigate("/home");
    });
    promise.catch(() => {
      alert("Algo deu errado! Tente novamente.");
    });
  }

  return (
    <Container>
      <Form onSubmit={newPost}>
        <div>
          <input
            type="text"
            placeholder="URL da imagem"
            value={post.imageUrl}
            required
            onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
          />
          <input
            type="text"
            placeholder="Legenda da imagem"
            value={post.caption}
            required
            onChange={(e) => setPost({ ...post, caption: e.target.value })}
          />
        </div>
        <div>
          {" "}
          <Button type="submit">
            <p>Salvar imagem</p>
          </Button>
        </div>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  div {
    display: flex;
    flex-direction: column;
    margin: 10px;
    justify-content: center;
    align-items: center;
  }
`;

const Form = styled.form`
  input {
    width: 200px;
    height: 30px;
    margin: 5px;
  }
  &::placeholder {
    margin: 10px;
    padding-left: 10px;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
`;
