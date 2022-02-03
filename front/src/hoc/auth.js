import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default (SpecificComponent, option, adminRoute = null) {

  function AuthenticationCheck(props) {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth().then(response => {
        console.log(response);
      }))

    }, [])

  }
}