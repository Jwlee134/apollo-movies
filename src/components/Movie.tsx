import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

interface Props {
  id: number;
  bg: string;
  isLiked: boolean;
}

const Container = styled.div``;

const Poster = styled.img`
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;

const Movie = ({ id, bg, isLiked }: Props) => {
  const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id, isLiked },
  });

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster src={bg} />
      </Link>
      <button onClick={() => toggleLikeMovie()}>
        {isLiked ? "Unlike" : "Like"}
      </button>
    </Container>
  );
};

export default Movie;
