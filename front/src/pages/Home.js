import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <p1>MiniPooWeb</p1>
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