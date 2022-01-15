import React, {useState} from 'react';
const LoginPage = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("email", email);
    console.log("password", password);

    let body = {
      email : email,
      password : password
    }

  }
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input type = "email" value = {email} onChange = {onEmailHandler} />
        <input type = "password" value = {password} onChange = {onPasswordHandler}/>
        <button> login </button>
      </form>
    </>
  )
}

export default LoginPage;