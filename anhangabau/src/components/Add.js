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
      "http://localhost:5001/info",
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
        <Button type="submit">
          <p>Salvar imagem</p>
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div``;

const Form = styled.form``;

const Button = styled.button``;
