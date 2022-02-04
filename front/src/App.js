import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from 'pages/About';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Admin from 'pages/Admin';
import CheckAuth from 'hoc/auth';


const App = () => {
  return (

     // Auth option
     // null -> 누구나 접근 가능
     // true -> 로그인 한 유저만 접근 가능
     // false -> 로그인 한 유저는 접근 불가능
    <Router>
      <Routes>
        <Route path="/" element={<CheckAuth SpecificComponent={{Home}} option ={null} />} />
        <Route path="/about" element={<CheckAuth SpecificComponent={{About}} option ={null} />} />
        <Route path="/login" element={<CheckAuth SpecificComponent={{Login}} option ={false} />} />
        <Route path="/register" element={<CheckAuth SpecificComponent={{Register}} option ={false} />} />
        <Route path="/admin" element={<CheckAuth SpecificComponent={{Admin}} option ={true} />} />
      </Routes>
    </Router>
  );
};

export default App;