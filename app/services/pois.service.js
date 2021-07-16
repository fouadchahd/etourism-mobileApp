import axios from "axios";
import service_env from "./__env.service";

const API_URL = service_env.API_URL;

export const getPoiCount = async()=>{
  return axios.get(API_URL+`pois.jsonld`).then(({data}) => data["hydra:totalItems"]).catch(()=>{return -1 ;});
}
export const getAllPois= async()=>{
  return axios.get(API_URL+'pois.json');
}
export const getAllPoisPaginated=async(item_per_page,page)=>{
  return axios.get(API_URL+`pois.json?pagination=true&itemsPerPage=${item_per_page}&page=${page}`);
} 

export const getPoisByName= async(name,count)=>{
  return axios.get(API_URL+`pois.json?pagination=true&itemsPerPage=${count}&exist[parent]=false&name=${name}`);
}

export const getPoisByCity=async(city_id)=>{
  return axios.get(API_URL+`pois.json?adresse.city=${city_id}`);
}

export const getPoisByType=async(type_id)=>{
  return axios.get(API_URL+`pois.json?typeOfAttraction=${type_id}`);
}

export const getPoisByParentType=async(parent_type_id)=>{
  return axios.get(API_URL+`pois.json?typeOfAttraction.parentType=${parent_type_id}`);
}