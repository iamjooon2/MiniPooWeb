import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import loginUser from '../actions/user_action';
import registerUser from '../actions/user_action';

const Register = (props) => {

  const dispatch = useDispatch();

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

    console.log("email", email);
    console.log("name", name);
    console.log("password", password);
    console.log("confirmpassword", confirmPassword);
    
    let body = {
      email : email,
      password : password,
      name : name
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.register) {
          props.history.push('/login')
        } else {
          alert('Fail to register');
        }
      })
  }
  return (
    <>
      <Container>
        <form onSubmit={onSubmitHandler}>
          <InputBlock type = "email" placeholder = "Email" value = {email} onChange = {onEmailHandler}/>
          <InputBlock type = "text" placeholder = "Name" value = {name}  onChange = {onNameHandler}/>
          <InputBlock type = "password" placeholder = "Password" value = {password} onChange = {onPasswordHandler}/>
          <InputBlock type = "password" placeholder = "Confirm Password" value = {confirmPassword} onChange = {onConfirmPasswordHandler}/>
          <ButtonBlock type = "submit"> Register </ButtonBlock>
        </form>
      </Container>
    </>
  )
}

export default Register;

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