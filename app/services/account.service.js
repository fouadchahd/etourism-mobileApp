import axios from "axios";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;
const jsonheaders = service_env.JSON_HEADER;
const headers = {headers:service_env.PATCH_HEADER};
import { getCredentials } from "./credentials";

axios.interceptors.request.use(async (config) => {
  const userJWT = await getCredentials();
  if (userJWT && userJWT.token) {
    const token = "Bearer " + userJWT.token;
    config.headers.Authorization = token;
  }
  return config;
});

export const updateFirstnameToDB = async (id, newValue) => {
  return axios.patch(
    API_URL + `tourists/${id}`,
    { firstName: newValue },
    headers );
};

export const updateLastnameToDB = async (id, newValue) => {
  return axios.patch(API_URL + `tourists/${id}`, { lastName: newValue }, headers);
};

export const updateBioToDB = async (id, newValue) => {
  return axios.patch(API_URL + `tourists/${id}`, { bio: newValue }, headers);
};

export const updateNationalityToDB = async (id, newValue) => {
  return axios.patch(
    API_URL + `tourists/${id}`,
    { nationality: newValue },
    headers
  );
};

export const updatePseudoToDB = async (id, newValue) => {
  return axios.patch(API_URL + `tourists/${id}`, { pseudo: newValue.toLowerCase() },headers);
};

export const updateProfilePictureToDB = async (id, newUrl) => {
  return axios.patch(API_URL + `tourists/${id}`, { profilePicture:{url:newUrl} }, headers);
};


export const isPseudoAlreadyUsed = async (pseudToCheck) => {
  return axios
    .get(API_URL + `tourists.json?pseudo=${pseudToCheck}`, {},{headers:jsonheaders})
    .then(({ data }) => {
      console.log("data.length", data.length);
      console.log("data", data);
      return data.length > 0 ? true : false;
    });
};


