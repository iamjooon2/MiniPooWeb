import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Home = () => {

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        console.log(response);
      })
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          MiniPooWeb
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  display : flex;
  justify-content : center;
  align-items: center;
  width : 100vw;
  height : 100vh;
`;

const Wrapper = styled.div`
  display : flex;
  justify-content : center;
  align-items: center;
  flex-direction: column;
`;