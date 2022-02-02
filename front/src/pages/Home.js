import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = () => {
  
  useEffect(() => {
    axios.get('/')
      .then(res => {
        console.log(res);
      })
  }, [] );

  return (
    <>
      <Container>
        <Wrapper>
          <div>MiniPooWeb</div>
          <Link to = "/login">login</Link> <br />
        <Link to = "/register">register</Link>
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