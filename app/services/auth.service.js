import axios from "axios";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;
const headers = service_env.JSON_HEADER;
import * as SecureStore from 'expo-secure-store';
import {getCredentials} from './credentials';

async function setValue(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);

  } catch (error) {
    console.log(error);
  }
}

async function getValue(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return "";
  }
}

export const registerUser = async function(firstName,lastName, email, password,gender,nationality,profilePicture){
  return axios.post(API_URL + "tourists", {
    firstName,
    lastName,
    email,
    "roles": [
      "ROLE_USER"
    ],
    password,
    gender,
    nationality,
    "profilePicture":{
      "url":profilePicture
    }
  },headers);
};
export const login = async function(username, password) {
    return axios
    .post(API_URL + "login_check", {
      username,
      password
    }, headers);     
  }

export const logout = async() => {
//remove user_auth from secureStorage and his refresh_token from db
try {
  axios.interceptors.request.use( async (config) => {
    const userJWT = await getCredentials();
    if(userJWT && userJWT.token){
      const token = 'Bearer ' + userJWT.token;
      config.headers.Authorization =  token;
    }
    return config;
  });
  await axios.post(API_URL+"logout",{},headers);
  await SecureStore.deleteItemAsync("jwt_auth");
} catch (error) {
  console.log("error",error)
}
}
export const updateCurrentUserInSecureStorage = (new_user_data)=>{
    //update the secureStorage with the new user_data
    setValue("jwt_auth",new_user_data);
}

