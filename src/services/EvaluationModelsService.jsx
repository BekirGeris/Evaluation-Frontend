import axios from "axios"

const BASE_URL = "http://localhost:9999/api/evaluationnmodels/";

export default class EvaluationModelsService{

    getEvaluationModelsByUserId(userId){
        return axios.get(BASE_URL + "getByUserId?userId=" + userId)
    }

    getParameterModelByParameterModelId(parameterModelId){
        return axios.get(BASE_URL + "getParameterModelByParameterModelId?parameterModelId=" + parameterModelId)
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

    addQuestionModel(questionModel){
        return axios.post(BASE_URL +  "addQuestionModel", questionModel)
    }

    addTopicModel(topicModel){
        return axios.post(BASE_URL +  "addTopicModel", topicModel)
    }

    addParameterModel(parameterModel){
        return axios.post(BASE_URL +  "addParameterModel", parameterModel)
    }

    addEvaluationModel(evaluationModel){
        return axios.post(BASE_URL +  "addEvaluationModel", evaluationModel)
    }
}