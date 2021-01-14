import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  overflow: auto;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 20px;
`;

const ImgColumn = styled.div`
  height: 70%;
  margin-right: 10px;
`;

const Poster = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

interface Id {
  id: string;
}

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      large_cover_image
      language
      rating
      description_intro
    }
  }
`;

const Detail = () => {
  const { id }: Id = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      id: parseInt(id),
    },
  });

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : data.movie.title}</Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data.movie.language} · {data.movie.rating}
            </Subtitle>
            <Description>{data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      <ImgColumn>
        <Poster src={data && data.movie && data.movie.large_cover_image} />
      </ImgColumn>
    </Container>
  );
};

export default Detail;
