import { API_BASEURL } from "../constants/typeCode"


export const fetchSampleData = (endpoint)=>{
    return window.fetch(API_BASEURL + endpoint)
}