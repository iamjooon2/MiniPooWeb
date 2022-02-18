import React from 'react';
import {  Routes, Route } from "react-router-dom";
import About from 'views/About';
import Home from 'views/Home';
import Login from 'views/Login';
import Register from 'views/Register';
import Admin from 'views/Admin';
// import Auth from 'hoc/auth';


const App = () => {

  // const CheckedHome = Auth(Home, null);
  // const CheckedAbout = Auth(Home, null);
  // const CheckedRegister = Auth(Home, false);
  // const CheckedLogin = Auth(Home, false);
  // const CheckedAdmin = Auth(Home, true);
  
  // Auth option
  // null -> 누구나 접근 가능
  // true -> 로그인 한 유저만 접근 가능
  // false -> 로그인 한 유저는 접근 불가능
  return (
      <Routes>
        {/* <Route path="/" element={<CheckedHome/> } />
        <Route path="/about" element={<CheckedAbout/> } />
        <Route path="/login" element={<CheckedLogin/> } />
        <Route path="/register" element={<CheckedRegister/> } />
        <Route path="/admin" element={<CheckedAdmin/> } /> */}
        <Route path="/" element={<Home/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/login" element={<Login/> } />
        <Route path="/register" element={<Register/> } />
        <Route path="/admin" element={<Admin/> } />      
      </Routes>
  );
}

export default App;