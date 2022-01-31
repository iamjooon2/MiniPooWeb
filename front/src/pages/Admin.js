import React, {useState} from 'react';
import styled from 'styled-components';


const Admin = () => {

  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');

  const onTitleandler = (e) => {
    setTitle(e.currentTarget.value);
  }

  const onURLHandler = (e) => {
    setURL(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // to prevent page refresh

    let body = {
      title : title,
      url : url,
      name : name
    }


  return (
    <>
      <Container>
        <form onSubmit={onSubmitHandler}>
          <InputBlock placeholder = "title" value = {title} onChange = {onTitleandler}/>
          <InputBlock placeholder = "link" value = {url} onChange = {onURLHandler}/>
          <ButtonBlock type = "submit"> login </ButtonBlock>
        </form>
      </Container>
    </>
  )
};

export default Admin;

const Container = styled.div`
  display : flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
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