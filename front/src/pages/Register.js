import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/user_action';

const Register = props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }
  
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // to prevent page refresh

    if (confirmPassword !== password) {
      return alert('Check your password');
    }

    let body = {
      email : email,
      name : name,
      password : password,
    }

    dispatch(registerUser(body))
      .then(res  => {
        console.log(res);
        if (res.payload.success){
          alert("Success!");
          navigate('/login');
        } else {
          alert("error!");
        }
    });
  };
 
  return (
    <>
      <Container>
        <Wrapper>
          <form onSubmit={onSubmitHandler} >
            <InputBlock type = "email" placeholder = "Email" value = {email} onChange = {onEmailHandler}/>
            <InputBlock type = "text" placeholder = "@Username" value = {name}  onChange = {onNameHandler}/>
            <InputBlock type = "password" placeholder = "Password" value = {password} onChange = {onPasswordHandler}/>
            <InputBlock type = "password" placeholder = "Confirm Password" value = {confirmPassword} onChange = {onConfirmPasswordHandler}/>
            <ButtonBlock type = "submit"> Register </ButtonBlock>
          </form>
          <RequestBlock><Link to = "/login">I already have an account</Link></RequestBlock>
        </Wrapper>
      </Container>
    </>
  )
}

export default Register;

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
  border : 0px;
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