import React from "react";
import { useDispatch } from "react-redux";
import { authUser } from "actions/user_action";
import { useNavigate } from "react-router-dom";

const Auth = ({ SpecificComponent, option, adminRoute = null }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(authUser()).then((response) => {
    // 로그인 하지 않은 상태
    if (!response.payload.isAuth) {
      if (option) {
        navigate("/login");
      }
    } else {
      // 로그인 한 상태
      if (adminRoute && !response.payload.isAdmin) {
        navigate("/");
      } else {
        if (option === false) {
          navigate("/");
        }
      }
    }
  });

  return <SpecificComponent />;
}

export default Auth;