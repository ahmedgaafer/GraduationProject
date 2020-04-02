import axios from 'axios'
import {GET_USER, DELETE_USER, ADD_USER} from "./types"

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;
axios.defaults.adapter = require('axios/lib/adapters/http');


//Get users
export const getUsers = () => dispatch => {
  axios.get('/api/users/')
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err))
}

//Delete user
export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/users/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err => console.log(`ERR: ${err}`))
}

//Add user
export const addUser = user => dispatch =>{
  axios
    .post('/api/users/', user)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.date
      })
    })
    .catch(err => console.log(err))
}

