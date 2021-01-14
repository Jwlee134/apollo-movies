import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  bg: string;
}

const Poster = styled.img`
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;

const Movie = ({ id, bg }: Props) => {
  return (
    <Link to={`/${id}`}>
      <Poster src={bg} />
    </Link>
  );
};

export default Movie;
