import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'; 
import { loginUser } from '../actions/user_action';

const Login = (props) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // to prevent page refresh

    let body = {
      email : email,
      password : password
    }

    //json으로 잘 담기는거 확인완료
    console.log(body);

    //안먹는 중 - proxy설정오류로 추정(404)
    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          props.history.push('/')
        } else {
          alert('Error');
        }
      })
  }
  return (
    <>
      <Container>
        <Wrapper>
          <form onSubmit={onSubmitHandler}>
            <InputBlock type = "email" placeholder = "Email" value = {email} onChange = {onEmailHandler}/>
            <InputBlock type = "password" placeholder = "Password" value = {password} onChange = {onPasswordHandler}/>
            <ButtonBlock type = "submit"> login </ButtonBlock>
          </form>
          <RequestBlock><Link to = "/register">I don't have an account</Link></RequestBlock>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login;

const Container = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 360px;
  height : 360px;
`;

const InputBlock = styled.input`
  padding : 10px;
  justify-content: center;
  align-items : center;
  border-radius : 7px;
  width : 95%;
  border : none;
  box-shadow : 0px 0px 3px gray;
  margin-bottom : 10px;
`;

const ButtonBlock = styled.button`
  margin-top : 5px;
  padding : 4px;
  border : none;
  border-radius : 4px;
  width : 100%;
  height : 28px;
  transition: .15s;
  &:hover {
    background-color : #6344C6;
    color : #DADEE0;
    cursor : pointer;
  }
`;

const RequestBlock = styled.div`
  text-decoration-line : none;
  margin-top : 10px;
  &:hover{
  text-decoration : underline; 
  cursor : pointer;
  }
`;