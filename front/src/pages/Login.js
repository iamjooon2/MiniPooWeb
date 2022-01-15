import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import loginUser from '../actions/user_action';

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

    console.log("email", email);
    console.log("password", password);

    let body = {
      email : email,
      password : password
    }

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
        <form onSubmit={onSubmitHandler}>
          <InputBlock type = "email" value = {email} onChange = {onEmailHandler}/>
          <InputBlock type = "password" value = {password} onChange = {onPasswordHandler}/>
          <ButtonBlock> login </ButtonBlock>
        </form>
      </Container>
    </>
  )
}

export default Login;

const Container = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  flex-direction : column;
  width: 100vw;
  height: 100vh;
`;

const InputBlock = styled.input`
  padding : 10px;
  justify-content: center;
  align-items : center;
  border-radius : 7px;
  width : 98%;
  border : none;
  box-shadow : 0px 0px 3px gray;
  margin-bottom : 10px;
`;

const ButtonBlock = styled.button`
  margin-top : 5px;
  padding : 4px;
  border : 0px;
  border-radius : 4px;
  width : 98%;
  height : 28px;
  transition: .15s;
  &:hover {
    background-color : #6344C6;
    color : #DADEE0;
    cursor : pointer;
`;