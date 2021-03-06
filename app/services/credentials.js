import axios from "axios";
import * as SecureStore from "expo-secure-store";
import service_env from "./__env.service";

var jwt_decode = require("jwt-decode");
const API_URL = service_env.API_URL;

export const deleteCredentials = async function () {
  try {
    await SecureStore.deleteItemAsync("jwt_auth");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const setCredentials = async function (jwt_auth) {
  try {
    await SecureStore.setItemAsync("jwt_auth", JSON.stringify(jwt_auth));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getCredentials = async () => {
  try {
    let credentials = await SecureStore.getItemAsync("jwt_auth");
    let cred = getVerifiedKeys(JSON.parse(credentials));

    if (credentials != null && cred != null) {
      return cred;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

function isTokenExpired(token) {
  try {
    console.log("token", token);
    var decoded = jwt_decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return false;
  }
}

async function getVerifiedKeys(keys) {
  console.log("Loading keys from secureStore");
  if (keys) {
    console.log("checking access");
    if (!isTokenExpired(keys.token)) {
      console.log("returning access");
      return keys;
    } else {
      console.log("access expired");
      console.log("checking refresh expiry");
      if (!isTokenExpired(keys.refreshToken)) {
        console.log("fetching access using refresh");
        const newtoken = getAccessUsingRefresh(keys.refreshToken);
        const new_jwt_auth = {
          refreshToken: keys.refreshToken,
          token: newtoken,
          data: keys.data,
        };
        await SecureStore.setItemAsync(
          "jwt_auth",
          JSON.stringify(new_jwt_auth)
        );
        console.log("JWT_AUTH UPDATED on SECURESTORE", newtoken);
        return new_jwt_auth;
      } else {
        console.log("refresh expired, please login");
        await SecureStore.deleteItemAsync("jwt_auth");
        return null;
      }
    }
  } else {
    console.log("access not available please login");

    return null;
  }
}
async function isRefreshTokenExpired(refershToken) {
  var newToken = getAccessUsingRefresh(refershToken);
}

async function getAccessUsingRefresh(refreshToken) {
  return axios
    .post(API_URL + "token/refresh", { refreshToken: refreshToken })
    .then(({ data }) => data.token);
}
