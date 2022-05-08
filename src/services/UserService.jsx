import axios from "axios"

const BASE_URL = "http://localhost:9999/api/users/";

export default class UserService{
    
    getByUserId(userId){
        return axios.get(BASE_URL + "getByUserId?userId=" + userId)
    }

    getByUserNameAndPassword(userName, password){
        return axios.get(BASE_URL + "getByUserWithUserNameAndPassword?password=" + password + "&userName=" + userName)
    }

    addUser(user){
        return axios.post(BASE_URL +  "addUser", user)
    }

    getUserBySessionUUID(sessionUUID){
        return axios.get(BASE_URL + "getUserBySessionUUID?sessionUUID=" + sessionUUID)
    }

    addSession(userId){
        return axios.post(BASE_URL +  "addSession?userId=" + userId)
    }

    deleteSession(sessionUUID){
        return axios.post(BASE_URL +  "deleteSession?sessionUUID=" + sessionUUID)
    }
}