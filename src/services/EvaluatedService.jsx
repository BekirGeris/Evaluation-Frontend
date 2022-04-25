import axios from "axios"

const BASE_URL = "http://localhost:9999/api/evaluated/";

export default class EvaluatedService{

    getQuestionsByTopicId(topicId){
        return axios.get(BASE_URL + "getByTopicId?topicId=" + topicId)
    }

    getTopicsByEvaluationId(evaluationId){
        return axios.get(BASE_URL + "getByEvaluationId?evaluationId=" + evaluationId)
    }

    addEvaluatedDto(evaluatedDto){
        return axios.post(BASE_URL +  "addEvaluatedDto", evaluatedDto)
    }
}