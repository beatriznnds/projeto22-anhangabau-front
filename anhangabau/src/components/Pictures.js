/* eslint-disable react/prop-types */
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
export default function Pictures({
  img,
  caption,
  author,
  setCurrentPage,
  pages,
}) {
  return (
    <Container>
      <IoIosArrowBack onClick={() => setCurrentPage(pages - 1)} />
      <Info>
        <img src={img} />
        <h3>{caption}</h3>
        <h4>Postado por {author}</h4>
      </Info>
      <IoIosArrowForward onClick={() => setCurrentPage(pages + 1)} />
    </Container>
  );
}

const Container = styled.div``;
const Info = styled.div``;
