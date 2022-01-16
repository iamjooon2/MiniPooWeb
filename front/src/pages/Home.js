import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <p1>Hi!</p1>
          <div>This is MiniPooWeb!</div>
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