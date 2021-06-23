import axios from "axios";
import service_env from "./__env.service";

const API_URL = service_env.API_URL;

export const getPoiCount = async()=>{
  return  axios.get(API_URL+`pois.jsonld`).then(({data}) => data["hydra:totalItems"]).catch(()=>{return -1 ;});
}

export const getPoisByName= async(name,count)=>{
  return axios.get(API_URL+`pois.json?pagination=true&itemsPerPage=${count}&exist[parent]=false&name=${name}`);
}
