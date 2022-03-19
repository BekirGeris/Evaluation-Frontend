import axios from "axios"

const BASE_URL = "http://localhost:9999/api/";

export default class EvaluationModels{
    
    getByUserId(userId){
        return axios.get(BASE_URL + "users/getByUserId?userId=" + userId)
    }

    getEvaluationModels(data){
        return axios.post(BASE_URL + "users/getByUserWithUserNameAndPassword", data)
    }

    addUser(data){
        return axios.post(BASE_URL +  "users/add", data)
    }
}