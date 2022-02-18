import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom'; 
import { loginUser } from 'actions/user_action';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // to prevent page refresh

    let body = {
      username : name,
      password : password
    }
    
    dispatch(loginUser(body))
      .then(res  => {
        console.log(res);
        if (res.payload.loginSuccess){
          alert("Login Success!");
          navigate('/');
        } else {
          alert("Login error!");
        }
    });
  }
  return (
    <>
      <Container>
        <Wrapper>
          <form onSubmit={onSubmitHandler}>
            <InputBlock type = "name" placeholder = "@Username" value = {name} onChange = {onNameHandler}/>
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