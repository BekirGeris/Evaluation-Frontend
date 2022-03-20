import React, { useEffect, useState } from 'react'
import EvaluationModelsService from '../services/EvaluationModelsService';

export default function Dashboard() {

    const [evaluationModels, setEvaluationModels] = useState([])

    useEffect(()=>{
        let evaluationModelsService  = new EvaluationModelsService();
        evaluationModelsService.getEvaluationModels().then(result => setEvaluationModels(result.data.data))
    })

  return (
    <div>{evaluationModels}</div>
  )
}