import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Movie from "../components/Movie";

const Container = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  color: white;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  margin: 50px 0px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`;

const Suggestions = styled.span`
  font-size: 30px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-top: 20px;
  font-size: 20px;
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
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
      isLiked @client
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
      {loading ? (
        <MainContainer>
          <Title>Loading...</Title>
        </MainContainer>
      ) : (
        <>
          <SLink to="/">Home</SLink>
          <MainContainer>
            <Column>
              <Title>
                {data.movie.title} {data.movie.isLiked ? "🧡" : "💔"}
              </Title>
              <Subtitle>
                {data?.movie?.language} · {data?.movie?.rating}
              </Subtitle>
              <Description>{data?.movie?.description_intro}</Description>
            </Column>
            <ImgColumn>
              <Poster src={data?.movie?.large_cover_image} />
            </ImgColumn>
          </MainContainer>
          <Suggestions>Suggestions</Suggestions>
          <Movies>
            {data?.suggestions?.map((movie: any) => (
              <Movie
                key={movie.id}
                id={movie.id}
                bg={movie.medium_cover_image}
                isLiked={movie.isLiked}
              />
            ))}
          </Movies>
        </>
      )}
    </Container>
  );
};

export default Detail;
