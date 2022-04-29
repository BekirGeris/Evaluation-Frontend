import axios from "axios"

const BASE_URL = "http://localhost:9999/api/evaluationnmodels/";

export default class EvaluationModelsService{

    getEvaluationModelsByUserId(userId){
        return axios.get(BASE_URL + "getEvaluationModelsByUserId?userId=" + userId)
    }

    getParameterModelByParameterModelId(parameterModelId){
        return axios.get(BASE_URL + "getParameterModelByParameterModelId?parameterModelId=" + parameterModelId)
    }

    getAllParameterModel(){
        return axios.get(BASE_URL + "getAllParameterModel")
    }

    getParameterModelByUserId(userId){
        return axios.get(BASE_URL + "getByParameterModelsUserId?userId=" + userId)
    }

    getQuestionModelsByTopicId(topicId){
        return axios.get(BASE_URL + "getQuestionModelsByTopicId?topicId=" + topicId)
    }

    getEvaluationModelByEvaluationModelId(evaluationModelId){
        return axios.get(BASE_URL + "getEvaluationModelByEvaluationModelId?evaluationModelId=" + evaluationModelId)
    }

    getTopicModelsByEvaluationModelId(evaluationModelId){
        return axios.get(BASE_URL + "getTopicModelsByEvaluationModelId?evaluationModelId=" + evaluationModelId)
    }

    addParameterModel(parameterModel){
        return axios.post(BASE_URL +  "addParameterModel", parameterModel)
    }

    addEvaluationModel(evaluationModelDto){
        return axios.post(BASE_URL +  "addEvaluationModel", evaluationModelDto)
    }
}