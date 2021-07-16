import axios from "axios";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;

export const getAllTours= async()=>{
    return axios.get(API_URL+`tours.json`);
}

export const getToursByCity= async(city_id)=>{
    if(typeof city_id === 'number'){
    return axios.get(API_URL+`tours.json?city=${city_id}`);}
    else{
       return getAllTours();
    }
}

export const getTourById= async (tour_id)=>{
    if(typeof tour_id === 'number'){
        return axios.get(API_URL+`tours/${tour_id}.json`);}       
}
